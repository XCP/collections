# marketplace-collections

The public collection catalog for [digirare.com](https://digirare.com). A
collection is one folder; adding or amending one is a pull request. Catalog
inclusion does not automatically make a collection listable: the marketplace
activates a reviewed subset in its own default-deny configuration.

This repo records **membership and metadata** — which assets belong to a
collection and what the collection says about them. Filesystem conventions,
not source declarations inside metadata, select membership. It never records chain
data (supply, issuance dates, divisibility — the marketplace reads those
from the chain itself) and never records marketplace operations (ordering,
listing gates — those are marketplace configuration, not facts about a
collection).

## Structure

```
collections/<slug>/
  meta.json    collection identity and editorial information
  assets.json  reviewed static membership snapshot
  adapter.ts  optional collection-operated API adapter
  protocol.json  optional derived-standard declaration
  README.md    collection-specific contribution notes
  icon.ext     optional square icon (png/jpg/webp/svg)
  logo.ext     optional wide logo

aggregators/<provider>/
  adapter.ts  last-precedence discovery/import adapter
  README.md    provider behavior and limitations

test/fixtures/
  ...          committed API responses used to test adapters without the network
```

The folder name is the slug.

### `meta.json`

```json
{
  "name": "Rare Pepe",
  "kind": "canonical",
  "description": "The original card canon, issued on Counterparty 2016–2018 across 36 series.",
  "links": { "website": "https://rarepepedirectory.com" }
}
```

### `assets.json`

```json
{
  "assets": [
    { "asset": "RAREPEPE", "attributes": [
      { "trait_type": "Artist", "value": "Mike" },
      { "trait_type": "Series", "value": 1 },
      { "trait_type": "Card", "value": 1 }
    ]},
    { "asset": "ANOTHERASSET" }
  ]
}
```

- `asset` is a Counterparty protocol identifier — a named asset
  (`RAREPEPE`), a numeric asset (`A9538869118141223875`), or a subasset
  longname (`DANK.COOKIES`). Both the numeric ID and longname of a subasset are
  accepted. Prefer the longname when it makes human review clearer; the
  marketplace resolves either form to the same compact trading key and retains
  the longname for display. `asset` is the only required field per entry.
- `attributes` follows the `{ "trait_type", "value" }` convention used by
  ERC-721/Metaplex metadata and the ordinals collection registries, so
  existing tooling and intuitions carry over. `Artist`, `Series`, and
  `Card` are the trait types the marketplace understands today (repeat
  `Artist` for collaborations); any other trait types are welcome and
  preserved for future use.
- `kind` is `"canonical"` or `"curated"`. A **canonical** collection is an
  asset's home — every asset has exactly one canonical membership, and that
  collection owns its editorial identity and its additive stats (volume,
  sales). A **curated** collection is a view across assets ("Pre-Ethereum",
  a game adopting existing cards): it may include any assets, never claims
  their identity, and never double-counts their volume.
- `links` is optional: `website`, `x`, `discord`.

### Membership source precedence

The layout itself selects membership in this order:

1. `collections/<slug>/assets.json`;
2. `collections/<slug>/adapter.ts`, for a collection-operated API or computed view;
3. `collections/<slug>/protocol.json`, only for a recognized derived standard;
4. the adapters under `aggregators/`;
5. otherwise materialization fails.

There are no `adapter`, `feed`, `source_class`, or provider URL fields in
`meta.json`. If `assets.json` exists, neither the collection adapter nor any
aggregator executes. If a selected higher-precedence source is malformed or
unavailable, the build fails rather than silently falling through.

Aggregator output can seed or refresh an explicit snapshot. Once committed as
`assets.json`, that reviewed static snapshot has precedence. See
[the collection guide](collections/README.md), [the aggregator guide](aggregators/README.md),
and [the adapter contract](docs/adapters.md).

`protocol.json` is not an API location and does not contain membership. It is a
small declaration such as `{ "protocol": "bitcoin-stamps" }` telling a
consumer that membership and the protocol-local ordinal are derived by that
consumer's indexer. It is reserved for standards such as Bitcoin Stamps rather
than ordinary project collections.

### Primary vs secondary membership

An asset's **primary** membership is an unflagged entry in a canonical
collection — there is exactly one per asset, and CI enforces it. If your
collection includes an asset whose home is elsewhere (a crossover card, a
game item borrowed from another set), keep it — flag it as secondary:

```json
{ "asset": "SATOSHICARD", "secondary": true }
```

The primary is almost always the collection that was here first; CI tells
you exactly which entry to flag when it finds a clash. Entries in curated
collections never claim a home, so they need no flag. Every canonical
collection must retain at least one unflagged primary entry; an all-overlap
group belongs in a curated collection instead.

### Computed curated views

A curated view may use a local `adapter.ts` instead of a static snapshot. For
example, `collections/pre-ethereum/adapter.ts` returns a normalized issuance
cutoff rule that the marketplace evaluates against its locally indexed asset
facts. The rule is code by location, not configuration embedded in `meta.json`,
and it performs no per-asset metadata crawl.

## Rules

1. **Protocol identifiers only.** Named assets, numeric assets, and
   subasset longnames — nothing else names an asset here. Nicknames and
   display titles belong in `attributes`, never in `asset`.
2. **One canonical home per asset.** An asset may appear in any number of
   curated collections and as `secondary` in other canonical ones, but it
   has exactly one primary membership. CI fails the PR otherwise and names
   the entry to flag.
3. **Membership and metadata only.** No chain data, no market data, no
   operational flags — if the chain or the marketplace can derive it, it
   does not belong here.
4. **One normalized asset contract.** Static lists, collection adapters, and
   aggregators all produce the same asset-entry schema. Computed curated rules
   are validated separately and resolve over that normalized universe.

## Adding a collection

Open a PR adding `collections/<slug>/meta.json`, `assets.json`, and a short
`README.md` (icon and logo welcome). A collection-operated `adapter.ts` may be
used when no reviewed static snapshot is available. CI validates the format,
Counterparty identifiers, normalized adapter output, and membership consistency.

Run the same checks locally with Node.js 22:

```sh
node .github/validate.ts
node .github/check-source-coverage.ts
node .github/run-tests.ts
```

Follow [the collection guide](collections/README.md) and
[CONTRIBUTING.md](CONTRIBUTING.md). Adapters require representative fixtures so
CI can test normalization deterministically.

## Wanted

- **Cake Commons** — no reliable source found; a PR with a citable list is
  welcome.
