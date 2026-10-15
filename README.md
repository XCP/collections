# Counterparty Collections

<!-- registry-facts:start -->
## Registry snapshot

| What is tracked | Count |
| --- | ---: |
| Collections | 1,107 |
| Canonical collections | 1,098 |
| Curated views | 9 |
| Explicit unique assets | 64,570 |
| Explicit collection memberships | 66,130 |
| Primary memberships | 64,570 |
| Secondary or curated memberships | 1,560 |
| Memberships with traits | 36,161 |

| Membership source | Collections |
| --- | ---: |
| Reviewed static `assets.json` | 1,103 |
| Collection or computed adapters | 3 |
| Marketplace-indexed exceptions | 1 |
| Active aggregator sources | 0 |
| Available aggregators | 3 |

Explicit membership counts exclude collections resolved later from chain facts, including Bitcoin Stamps and Pre-Ethereum.

Trait types: ATK, Affiliation, Art year, Artist, Attack, Background, Based on, Car, Card, Catalog, Chapter, City, Colour, Component, Date, Design, Edition, Element, Emoji, Episode, Eyes, Face, HP, Head, Health, ID, Illustrator, Kaleidoscope ID, Month, Mouth, Name, Number, Pioneer, Rarity, Region, Role, SPD, Season, Series, Source artwork, Speed, Story, Theme, Tier, Title, Type, Variant, Work, Year.

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
dominant artwork shape. `founded` records the supported project year or a reviewed
first-use estimate. Every registered collection must supply it and document the
evidence and uncertainty in its README. Registration alone, an old parent namespace,
or an older borrowed member must not backdate a later project. Consumers should use
this editorial date rather than the oldest member issuance. Optional links are
`website`, `x`, and `discord`. See the
[`meta.json` schema](schemas/collection-meta.schema.json).

`variation_of` names the parent of a variations collection: one work and its
alternate versions (alternate art, prints, signed or event editions)
registered as subassets of that parent. Such a collection lists the parent,
usually as a secondary member of its own primary collection, and nothing but
the parent's subassets; validation enforces both. Marketplaces keep it
browsable and tradeable on its own but do not feature it beside ordinary
collections. Do not use it for a set of distinct works that merely share a
namespace.

A `Based on` trait names the earlier work an asset reworks: another
project's bootleg, neon, pixel, stamp, flip or papertoy take on a card, or
a physical edition of it. Its value is the original's asset id and must be
in the registry. Record it only where the relationship is explicit, such as
a subasset named after the original (`BOOTLEGPEPE.DJPEPE`), never from
style alone. Marketplaces link the asset to its original; the trait does
not change either asset's collection.

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

Traits use `{ "trait_type", "value" }`, matching common NFT metadata. Other
traits are preserved as published. These have registry meaning and checks:

| Trait | Value | Meaning and rules |
| --- | --- | --- |
| `Artist` | string | The work's creator. Repeat it, in order, for a collaboration. One artist has one spelling: values that differ only by case, spacing or punctuation fail validation. Never an address or a placeholder (see `data/blocked-artist-credits.json`). Combined labels such as "A x B" are split into individual credits by `data/collaboration-credits.json`. |
| `Series`, `Card` | number | A catalogue position, for sets that publish one. |
| `Art year` | integer, 2014–2100, at most one | The evidenced year the artwork appeared, distinct from asset registration. Use dated artwork/catalogue evidence or corroborated artwork-bearing issuance history; the first metadata URL alone is not sufficient. Reviewed first-use estimates may use the named work, edition history and project context together; document the reasoning and uncertainty. Used to date the work and its artist. |
| `Based on` | registered asset id, at most one | The earlier work this asset reworks: another project's take on a card, or a physical edition. Record it only where the relationship is explicit (the asset's name embeds the original, or its own metadata says so) and the art confirms it. |

An entry omits `attributes` when it has none and omits `primary` unless it is
`false`; validation rejects the no-op forms in reviewed files.

Subassets are listed by longname. `data/numeric-assets.json` maps every numeric
id the registry uses; run `npm run numeric:resolve` after adding one.

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

### Optional project date precision

Alongside the required `founded` year, `founded_date` may supply `YYYY-MM` or `YYYY-MM-DD`. It must be a valid calendar date matching the year. Use only the precision supported by cited evidence in the collection README; a reviewed first-use estimate must be described as such. Asset registration alone is not launch evidence. Do not invent January 1, a day within a known month, or a timestamp to fill missing precision. Consumers may use this field for within-year ordering while retaining year-only labels. Collections without it retain their documented year; their relative position within that year remains unspecified.

### Editorial labels

Optional `editorial_type` describes the intent of a grouping: `set` for works intended together, `series` for a named artistic sequence or body of work, and `curation` for a retrospective selection. Follow creator/catalogue evidence and document it in the collection README. Omit for ordinary collections or uncertain cases. This is independent of `kind`, primary membership, and collection overlap: never derive it from those fields. `variation_of` already identifies variations of one work and cannot be combined with `editorial_type`. A shared subasset namespace alone does not establish a series. Labels do not imply acceptance into a parent directory.

### Artwork relationships and project identity

`editorial_type` also accepts `subassets`, `editions`, and `variations`:

- `subassets`: a discovery grouping whose supported relationship is a shared Counterparty parent namespace. Children can be distinct works. Include the parent for context when appropriate; document its exact identity and reviewed children. This is not a claim that the creator launched a named collection.
- `editions`: distinct asset identifiers representing the same artwork. Support with matching artwork and metadata, shared source files, or creator edition documentation. Do not infer physical ownership or redemption.
- `variations`: visually reworked versions of one composition, including groups with separate named assets and no single namespace parent. Different works by the same artist are insufficient.

These are explicit, evidence-based decisions, never automatic consequences of size, issuer, or naming. A documented project such as Punk Frens remains an ordinary collection even when its membership consists entirely of subassets. A named sequence can remain a series. Namespace describes membership structure, not necessarily project identity. Record the source and reasoning in each README.

Keep existing `variation_of` for an evidenced parent-work relationship; it remains mutually exclusive with `editorial_type`. Do not invent a parent asset for parallel editions. Consumers should preserve access through asset relationships and search, while distinguishing these relationship groups from standalone projects in discovery. Memberships, artist credits and existing directory homes are unchanged by classification.
