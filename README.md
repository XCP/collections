# marketplace-collections

The public curation index for [digirare.com](https://digirare.com) — the
bounded set of Counterparty collections the marketplace lists. A collection
is one folder with one JSON file; adding or amending a collection is a pull
request.

This repo records **membership and metadata** — which assets belong to a
collection and what the collection says about them. It never records chain
data (supply, issuance dates, divisibility — the marketplace reads those
from the chain itself) and never records marketplace operations (ordering,
listing gates — those are marketplace configuration, not facts about a
collection).

## Structure

```
collections/<slug>/
  meta.json    the collection: identity at the top, assets below
  icon.ext     optional square icon (png/jpg/webp/svg)
  logo.ext     optional wide logo
```

The folder name is the slug.

### meta.json

```json
{
  "name": "Rare Pepe",
  "kind": "canonical",
  "description": "The original card canon, issued on Counterparty 2016–2018 across 36 series.",
  "links": { "website": "https://rarepepedirectory.com" },
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

- `asset` is the canonical compact Counterparty id — never a subasset
  longname. It is the only required field per entry.
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

## Rules

1. **Canonical ids only.** Subasset longnames are display metadata, never
   keys.
2. **One canonical home per asset.** An asset may appear in any number of
   curated collections, but exactly one canonical collection. The
   marketplace build fails on cross-canonical duplicates.
3. **Membership and metadata only.** No chain data, no market data, no
   operational flags — if the chain or the marketplace can derive it, it
   does not belong here.
4. **Frozen sets only, for now.** A collection with assets first issued
   within the last two years is recorded here but not listed yet. The
   marketplace checks issuance dates against the chain on every build, so
   collections age into eligibility automatically.

## Adding a collection

Open a PR adding `collections/<slug>/meta.json` (icon and logo welcome).
Keep the description to one or two sentences, and say in the PR where the
asset list comes from.

## Wanted

- **STAMPS (classics)** — still minting; no authoritative frozen subset yet.
- **LFG Collection**, **Faux Bitcorn**, **17ART** — sourceable, but each has
  issuances inside the two-year window; welcome now, listed when frozen.
- **Cake Commons** — no reliable source found; a PR with a citable list is
  welcome.
