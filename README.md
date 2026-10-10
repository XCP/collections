# Counterparty Collections

<!-- registry-facts:start -->
## Registry snapshot

| What is tracked | Count |
| --- | ---: |
| Collections | 628 |
| Canonical collections | 624 |
| Curated views | 4 |
| Explicit unique assets | 64,510 |
| Explicit collection memberships | 65,416 |
| Primary memberships | 64,510 |
| Secondary or curated memberships | 906 |
| Memberships with traits | 33,650 |

| Membership source | Collections |
| --- | ---: |
| Reviewed static `assets.json` | 625 |
| Collection or computed adapters | 2 |
| Marketplace-indexed exceptions | 1 |
| Active aggregator sources | 0 |
| Available aggregators | 3 |

Explicit membership counts exclude collections resolved later from chain facts, including Bitcoin Stamps and Pre-Ethereum.

Trait types: ATK, Affiliation, Art year, Artist, Attack, Background, Car, Card, Chapter, Colour, Component, Date, Edition, Element, Emoji, Eyes, Face, HP, Head, Health, ID, Kaleidoscope ID, Month, Mouth, Name, Number, Pioneer, Rarity, Role, SPD, Season, Series, Speed, Story, Tier, Title, Type, Work, Year.

Available aggregators: [orbital](aggregators/orbital/), [pepe-wtf](aggregators/pepe-wtf/), [tokenscan](aggregators/tokenscan/).
<!-- registry-facts:end -->

The public catalog of Counterparty asset collections. One collection is one
folder. Changes are made through pull requests.

This repo controls collection names, descriptions, links, membership, and
editorial traits. It does not create sale listings. To sell an asset, use a
marketplace application. To add a project to the catalog or correct its data,
use this repo.

Catalog inclusion does not automatically enable trading. Each consumer chooses
which collections it supports.

## Start here

| I want to... | Go here |
| --- | --- |
| Add my collection | [Add a collection](collections/README.md#add-a-collection) |
| Fix a name, description, or link | Find the folder in [`collections/`](collections/) and edit `meta.json` |
| Add, remove, or correct an asset | Edit that collection's `assets.json`; see [asset membership](collections/README.md#asset-membership) |
| Add or correct traits | Edit the asset's `attributes` in `assets.json`; see [traits](#traits) |
| Use my collection's API | Add a local `adapter.ts` and remove `assets.json`; see [switching sources](docs/adapters.md#switching-sources-and-handling-outages) |
| Report a problem without writing code | [Open a collection change request](https://github.com/XCP/collections/issues/new?template=collection-change.yml) |
| List an asset for sale | Use a marketplace application; no repo change is needed |

For contribution steps, see [CONTRIBUTING.md](CONTRIBUTING.md). GitHub can make
small edits in the browser: open a file, click the pencil, describe the change,
and submit a pull request from the fork GitHub creates.

## Collection folder

```text
collections/<slug>/
  meta.json      name, type, description, art frame, founding year, and links
  assets.json    reviewed static membership, preferred when available
  adapter.ts     optional collection-operated API adapter
  README.md      collection-specific notes
  icon.ext       optional square icon: png, jpg, webp, or svg
  logo.ext       optional wide logo
```

The folder name is a stable lowercase kebab-case slug, such as `rare-pepe`.

Useful examples:

- [Age of Rust](collections/age-of-rust/) uses a small static `assets.json`.
- [Kaleidoscope](collections/kaleidoscope/) uses a collection API adapter.
- [Bitcoin Stamps](collections/bitcoin-stamps/) documents marketplace-indexed membership.

### Collection metadata

`meta.json` contains editorial information only:

```json
{
  "name": "Rare Pepe",
  "kind": "canonical",
  "description": "The original card canon, issued on Counterparty from 2016 to 2018 across 36 series.",
  "art_frame": "card",
  "founded": 2016,
  "links": {
    "website": "https://rarepepedirectory.com"
  }
}
```

Required fields are `name`, `kind`, `description`, and `art_frame`.
`art_frame` is `card`, `square`, or `landscape`, based on the collection's
dominant artwork shape. `founded` is the year the project launched; every
collection carries one, and a new collection should too. Without it, a
marketplace dates the collection from its oldest member's issuance, which
overstates the age of a collection that adopted assets registered before it
existed. Optional links are `website`, `x`, and `discord`. See the
[`meta.json` schema](schemas/collection-meta.schema.json).

### Asset membership

`assets.json` contains the complete reviewed membership snapshot:

```json
{
  "assets": [
    {
      "asset": "RAREPEPE",
      "attributes": [
        { "trait_type": "Artist", "value": "Mike" },
        { "trait_type": "Series", "value": 1 },
        { "trait_type": "Card", "value": 1 }
      ]
    },
    { "asset": "ANOTHERASSET" }
  ]
}
```

`asset` must be a Counterparty protocol identifier:

- named asset: `RAREPEPE`
- numeric asset: `A9538869118141223875`
- subasset longname: `DANK.COOKIES`

Both a subasset's numeric identifier and longname are accepted. Prefer the
longname when it is easier to review. Consumers can resolve both forms to the
same compact identity and retain the longname for display. See the
[`assets.json` schema](schemas/assets.schema.json).

### Traits

Traits use `{ "trait_type", "value" }`, matching common NFT metadata. The
registry defines `Artist`, `Series`, and `Card` today. Repeat `Artist` for a
collaboration. Other traits are preserved.

Do not put supply, divisibility, issuance dates, ownership, prices, listings,
or sales in this repo. Consumers derive chain and market facts independently.

### Canonical, curated, primary, and secondary

A `canonical` collection is an asset's main home. An asset represented in
canonical collections has one primary home. CI rejects duplicate primary homes.

A `curated` collection is a view across existing assets, such as Pre-Ethereum.
It does not claim their identity or double-count their activity.

If a canonical collection includes an asset whose primary home is another
collection, keep the entry and mark it secondary:

```json
{ "asset": "SATOSHICARD", "primary": false }
```

CI names the conflicting collections when it finds a duplicate primary. A
canonical collection must keep at least one primary asset. If every member is
an overlap, use `"kind": "curated"` instead.

Counterparty (`counterparty`) is an exclusive fallback for assets without another collection. An exported asset in any other collection must never also appear in Counterparty, regardless of primary/secondary status. After all sources load, the exporter removes overlapping Counterparty candidates and assigns their canonical project home before resolving other overlaps. It preserves reviewed Artist traits (including multiple artists) and fills missing project traits from the fallback entry; project-specific trait values take precedence. The Counterparty source can retain fallback candidates and their credits so fresh adapter memberships are handled on every export. A curated-only overlap without a canonical replacement fails export. Validation also rejects secondary Counterparty memberships and any unresolved overlap. Artist attribution is independent of this exclusivity rule; other collections may still overlap with each other.

## How membership is selected

The first source that exists wins:

1. [`collections/<slug>/assets.json`](collections/)
2. `collections/<slug>/adapter.ts` for a collection-operated API or computed view
3. an adapter in [`aggregators/`](aggregators/)

There is no silent fallback. If the selected source fails, the build fails. Do
not put assets, adapters, provider URLs, or source configuration in `meta.json`.

An aggregator can help create an initial static snapshot. After `assets.json`
is committed, the static file takes precedence. See the
[collection guide](collections/README.md),
[adapter contract](docs/adapters.md), and
[aggregator guide](aggregators/README.md).

## Submit a change

For most additions:

1. Create `collections/<slug>/meta.json`.
2. Create `collections/<slug>/assets.json`.
3. Add a short `README.md`.
4. Add an icon or logo if available.
5. Open a pull request and explain how reviewers can verify the change.

For a correction, edit only the affected file. You do not need to regenerate
unrelated data.

Run the full check with Node.js 22. There is no install step:

```sh
npm run check
```

CI checks JSON shape, Counterparty identifiers, membership conflicts, adapter
fixtures, and live materialization when applicable. Generated `dist/` files are
not committed.

More detail:

- [Collection contribution guide](collections/README.md)
- [Contributor and PR expectations](CONTRIBUTING.md)
- [Collection and aggregator adapters](docs/adapters.md)
- [Standard collection feed](docs/feed-v1.md)
- [Public schemas](schemas/)
- [Open a collection change request](https://github.com/XCP/collections/issues/new?template=collection-change.yml)

## Wanted

- **Cake Commons:** no reliable membership list has been found. A PR with a
  verifiable list is welcome.

## Asset classification

Membership entries may include `"asset_type": "currency"` for a project's
payment or utility currency, or `"asset_type": "collectible"`. Omission means
unclassified; it is not a claim about divisibility or supply. For example:

```json
{ "asset": "PEPECASH", "asset_type": "currency" }
```

Currencies retain their collection membership, artwork and other metadata.
The registry publishes the classification without deciding whether a consumer
should display or trade the asset. Consumers apply their own eligibility rules.
Static files and adapters use the same field, preserved in feed-v1 exports.

The initial currency annotations match the explicit quote-asset lists in
[XCP/exchange](https://github.com/XCP/exchange/blob/main/apps/web/src/utils/constants.ts)
and [XCP/explorer](https://github.com/XCP/explorer/blob/main/apps/web/src/lib/trading-pair.ts).
They are reviewed registry metadata, not a runtime dependency on those repos.
Do not classify assets by `CASH`/`COIN` name matching: collectible names can
contain those words too.

## Parent artwork in subasset collections

For a collection organized around subassets, review the parent for inclusion as well. Include it when it is related artwork, a genesis piece, or a project cover that helps explain the family. The parent need not look identical to its children.

If the parent already has an established primary collection, preserve that membership and add the parent to the subasset collection with `"primary": false`. Preserve the parent's own artist credits and traits; do not copy the children's attribution onto it. A parent without another primary home may be primary in the family after review.

This is an editorial default, not automatic membership by prefix. Exclude empty namespace holders, placeholders without artwork, unrelated reused parents, and umbrella assets that do not belong to the specific series. Record the evidence or exception in the collection README. A child's acceptance into an official directory does not establish acceptance of its parent, and vice versa.
