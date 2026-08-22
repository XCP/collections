# Collection adapters

Adapters translate public APIs into the same normalized membership contract as
`assets.json`. Location supplies their role; collection metadata contains no
adapter configuration.

- `collections/<slug>/adapter.ts` is operated for that collection.
- `aggregators/<provider>/adapter.ts` is a general third-party source.

Static `assets.json` has precedence over a collection adapter. A reserved
`protocol.json` declaration comes next for consumer-indexed standards, then
aggregators. A selected source failure fails export. It does not fall through.
An adapter is appropriate for pagination, nesting, naming, or
other response-shape differences that genuinely require code.

## Module contract

An adapter exports one async function:

```js
const URL = "https://api.example.com/cards?set=genesis";

export async function load({ collection, fetchJson, fetchText, cache }) {
  const response = await fetchJson(
    URL,
    { timeoutMs: 10_000, maxBytes: 2_000_000, maxRedirects: 2 },
  );

  if (!Array.isArray(response.cards)) {
    throw new Error("expected cards array");
  }

  return response.cards.map((card) => ({
    asset: card.counterparty_asset,
    attributes: [
      { trait_type: "Artist", value: card.artist },
      { trait_type: "Series", value: card.series },
      { trait_type: "Card", value: card.card_number },
    ],
  }));
}
```

The arguments are:

- `collection`: the collection folder slug;
- `fetchJson(url, options?)`: the repository's bounded JSON fetch helper;
- `fetchText(url, options?)`: the equivalent bounded text helper for public
  CSV, text, or static JavaScript data files;
- `cache`: a source-local `Map` shared during one materialization
  during one export, then discarded.

Both fetch helpers accept only `timeoutMs`, `maxBytes`, `maxRedirects`, and
public request `headers`. Repository caps still apply. Use these injected
functions instead of global `fetch` so tests can replace the network with
fixtures. `fetchText` returns inert text; an adapter must parse it and must
never evaluate it as JavaScript.

When several collection folders read one directory, store the in-flight parse
promise in `cache`. This makes the export fetch that directory once, including
when materialization becomes concurrent, while a later export still receives a
fresh cache. Delete a rejected promise before rethrowing so a transient failure
can be retried.

`load` may return either an `assets` array or a complete feed document:

```json
{
  "schema_version": 1,
  "collection": "example-cards",
  "assets": [{ "asset": "EXAMPLECARD" }]
}
```

Both forms pass through the same schema validation and deterministic
normalization. The result is a complete snapshot, not a partial update.

## Included TokenScan aggregator

`aggregators/tokenscan/adapter.ts` translates TokenScan's direct JSON project
API; the Explorer repository and `api.xcp.io` are not inputs or runtime
dependencies. The collection slug is used as the provider project slug.

The project must exactly match the lowercase slug returned inside
`https://tokenscan.io/explorer/project/<project>?start=0&length=5000`.

The adapter requires `success: true`, the exact response slug, equal internal
`recordsTotal`/`recordsFiltered`/`data.length` counts, and Tokenscan's six-field
row tuple. It deliberately does not trust counts from the separate project
catalog. The tuple's identity field is `asset|asset_longname`; the adapter uses
the longname when present and the compact asset otherwise, preserving subasset
identity without a hand-maintained alias table. It ignores supply, price,
volume, and other market fields in the tuple.

Requests are serialized at no more than 30 project reads per minute within an
export. HTTP 429 and transient 5xx responses retry with bounded
exponential/`Retry-After` delays,
and repeated reads of the same project share one response promise.

## Included pepe.wtf aggregator

`aggregators/pepe-wtf/adapter.ts` translates pepe.wtf's aggregator asset API,
filtered by collection. It never calls the Explorer or `api.xcp.io`. The
collection slug is passed directly to the provider.

The adapter requests only
`https://api.pepe.wtf/api/asset?collection=<collection>`, retains rows whose
source `collection` exactly matches the requested slug, and requires each
included `name` to be a Counterparty asset identifier. Reviewed static
snapshots are responsible for explicit primary/secondary ownership.

If a provider response includes a known placeholder or display-name row rather
than a Counterparty identifier, it must not be silently discarded. Review the
row first, then list its exact name in optional `excluded_names`; the adapter
fails when a configured exclusion is absent, so stale exceptions stay visible.
Feeds where most names are display titles are not suitable for this adapter.

`artist.name`, `serie`, and `card` become `Artist`, `Series`, and `Card`
attributes. pepe.wtf uses `null` for some unknown artists and card numbers; the
adapter omits only those unavailable traits. Supply, issuer state, prices,
floor, sales, ranks, and every other chain or market field are intentionally
ignored. The response is bounded to 2 MB and 10,000 rows, and repeated reads of
the same collection share one request within an export.

## Adapter rules

- Use only Node.js built-ins and repository helpers. Do not add npm packages.
- Fetch only public HTTPS JSON or inert text data. Never require secrets,
  cookies, login state, or wallet interaction.
- Return Counterparty protocol asset identifiers, not display names or local
  database IDs.
- Return only membership and attributes. Chain facts and market data do not
  belong here.
- Validate enough of the upstream shape to fail clearly instead of silently
  returning an empty or truncated collection.
- Handle pagination explicitly and impose a finite page/item limit.
- Produce deterministic output. Do not use current time, randomness, local
  files outside committed fixtures, environment-specific values, or writes.
- Throw on upstream errors, malformed pages, incomplete pagination, or
  ambiguous identifiers. A failed build is safer than publishing a partial
  snapshot.
- Keep provider-specific behavior inside its adapter. Do not add special cases
  to the marketplace consumer.

## Fixture-backed tests

Every aggregator has representative JSON, text, or static JavaScript responses
under `test/fixtures/adapters/<provider>/` and a matching test. Collection
adapters have tests under `test/collections/`. CI enforces that convention. Tests use the
built-in `node:test` runner and inject a fake `fetchJson` or `fetchText`; a unit
test must never rely on the live endpoint.

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { load } from "../../aggregators/example-project/adapter.ts";

test("normalizes the example project response", async () => {
  const fixture = JSON.parse(
    await readFile(new URL("../fixtures/adapters/example-project/cards.json", import.meta.url)),
  );
  const requested = [];
  const fetchJson = async (url) => {
    requested.push(url);
    return structuredClone(fixture);
  };

  const assets = await load({
    collection: "example-cards",
    fetchJson,
  });

  assert.deepEqual(requested, ["https://api.example.com/cards?set=genesis"]);
  assert.deepEqual(assets, [
    {
      asset: "EXAMPLECARD",
      attributes: [
        { trait_type: "Artist", value: "Alice" },
        { trait_type: "Series", value: 1 },
        { trait_type: "Card", value: 4 },
      ],
    },
  ]);
});
```

Fixtures should cover the real upstream shape, pagination when applicable, and
at least one malformed response. Keep fixtures focused; do not commit a huge
production dump merely to test a field mapping.

Run:

```sh
node .github/validate.ts
node .github/check-source-coverage.ts
node .github/run-tests.ts
node scripts/export.ts
```

`.github/run-tests.ts` runs only files named `*.test.ts`, so adapter modules
stored as fixtures are not accidentally executed as tests. The export command
materializes the conventional sources and writes `dist/collections.json`.

## CI security boundary

Adapters are contributed executable code. Pull-request CI therefore uses the
`pull_request` event, a read-only token, no repository secrets, and a checkout
without persisted credentials. It must never be changed to
`pull_request_target` for adapter execution. Fixture coverage is a required
review gate; a live endpoint is not trusted to make marketplace changes by
itself.

The injected fetch helpers reject credentials, non-HTTPS URLs, `localhost`, and
loopback/private/link-local/unspecified IP literals, including redirects to
those targets. They intentionally do not perform a separate DNS-resolution
sandbox. Adapter modules are reviewed, unsandboxed JavaScript, so transport
checks complement code review; they do not replace it.
