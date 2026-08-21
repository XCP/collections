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

- `asset` is a Counterparty protocol identifier — a named asset
  (`RAREPEPE`), a numeric asset (`A9538869118141223875`), or a subasset
  longname (`DANK.COOKIES`). Prefer the longname for subassets: it is
  protocol-registered, unique, and this file is reviewed by humans; the
  marketplace resolves it to its numeric id when it builds. It is the only
  required field per entry.
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
collections never claim a home, so they need no flag.

### Rule-defined membership

A curated collection may define its members by a rule instead of a list —
`where` in place of `assets`:

```json
{
  "name": "Pre-Ethereum",
  "kind": "curated",
  "description": "Curated assets issued before Ethereum's genesis block.",
  "where": { "issued_before_block": 367561 }
}
```

The rule is resolved against the assets already in this repo's canonical
collections — a lens over the curation, not a query over the whole chain —
and the rule itself never runs anywhere near the marketplace database: it
is materialized into an explicit membership list at build time. CI runs
the same materialization on every collections PR (`.github/resolve.mjs`)
and posts the resolved count and a sample to the job summary, so reviewers
approve the actual membership, not the prose of a rule. A rule that
matches nothing, or matches the entire curated universe, fails CI.

Predicates: `issued_before_block`, `issued_after_block`, `collection_in`
(slugs), `issuer_in` (addresses), `trait` (`{ "trait_type", "value" }`),
`explorer_tag` (a classifier our explorer computes, e.g. `"stamp"`).
Multiple predicates AND together. Canonical collections always enumerate
their assets.

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
4. **Frozen sets only, for now.** A collection with assets first issued
   within the last two years is recorded here but not listed yet. The
   marketplace checks issuance dates against the chain on every build, so
   collections age into eligibility automatically.

## Adding a collection

Open a PR adding `collections/<slug>/meta.json` (icon and logo welcome).
Keep the description to one or two sentences, and say in the PR where the
asset list comes from. CI validates the format, canonical asset ids, and
membership consistency on every PR (`.github/validate.mjs` — run it
locally with `node .github/validate.mjs`).

## Wanted

- **STAMPS (classics)** — still minting; no authoritative frozen subset yet.
- **LFG Collection**, **Faux Bitcorn**, **17ART** — sourceable, but each has
  issuances inside the two-year window; welcome now, listed when frozen.
- **Cake Commons** — no reliable source found; a PR with a citable list is
  welcome.
