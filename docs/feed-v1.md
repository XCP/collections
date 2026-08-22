# DigiRare collection feed v1

A standard feed lets a collection publish complete normalized membership with
very little adapter code. The collection's name, description, kind, links, and
media remain reviewed in this repository; the endpoint supplies only the asset
snapshot and attributes.

The endpoint URL is implemented inside `collections/<slug>/adapter.ts`, not
declared in `meta.json`. A small adapter fetches the fixed collection-operated
URL and returns this document. If `assets.json` also exists, the static snapshot
has precedence and the adapter is not executed.

The machine-readable contract is
[`schemas/feed-v1.schema.json`](../schemas/feed-v1.schema.json).

## Request

The collection adapter performs an unauthenticated `GET` of a fixed HTTPS URL
using the injected bounded `fetchJson` helper. The endpoint should:

- return JSON with an `application/json` content type;
- require no cookies, API key, wallet signature, or other secret;
- respond within 10 seconds;
- fit within 2 MiB;
- use no more than two redirects.

Those are the default fetch bounds, not targets. Ordinary HTTP cache headers
are welcome. The endpoint must not rely on a particular browser origin.

## Response

```json
{
  "schema_version": 1,
  "collection": "example-cards",
  "assets": [
    {
      "asset": "EXAMPLECARD",
      "attributes": [
        { "trait_type": "Artist", "value": "Alice" },
        { "trait_type": "Series", "value": 1 },
        { "trait_type": "Card", "value": 4 }
      ]
    },
    {
      "asset": "CROSSOVERCARD",
      "secondary": true
    }
  ]
}
```

- `schema_version` is the number `1`.
- `collection` exactly matches the `collections/<slug>/` folder name.
- `assets` is a non-empty, complete snapshot. Each Counterparty asset
  identifier appears once.
- `secondary: true` means the asset's canonical primary home is another
  collection. Omit it for primary members and for members of curated views.
- `attributes` is optional and uses `{ "trait_type", "value" }`, where the
  value is a non-empty string or a number. `Artist`, `Series`, and `Card` are
  understood by the marketplace today; other traits are retained by the
  registry contract.

Asset and attribute order is preserved. Use a stable order so snapshots and
pull-request diffs remain useful.

The response must not include supply, divisibility, issuer state, ownership,
UTXOs, listings, prices, volume, or other data DigiRare reads from Counterparty
or computes itself.

## Snapshot behavior

The feed is a complete snapshot, not an incremental event stream. If a member
is absent from a later successful snapshot, it is absent from the normalized
collection. A timeout, malformed response, duplicate asset, slug mismatch, or
schema error fails the build; DigiRare does not treat an error as an empty
collection or try a lower-priority source.

The marketplace materializes it during controlled ingestion, never during a
user request. A project may instead commit the validated response as
`assets.json`, making ingestion entirely static.

## Local smoke test

After adding the collection's local `adapter.ts`, run with Node.js 22:

```sh
node .github/validate.ts
node .github/check-source-coverage.ts
node .github/run-tests.ts
node scripts/export.ts
```

The export command performs the live request and writes ignored output to
`dist/collections.json`. Commit a representative response fixture and a test
under `tests/collections/`. Do not commit `dist/`.
