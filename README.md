# marketplace-collections

The public collection catalog for [DigiRare](https://digirare.com). One
collection is one folder. Changes are made through pull requests.

This repo controls collection names, descriptions, links, membership, and
editorial traits. It does not create sale listings. To sell an asset, use the
DigiRare marketplace. To add a project to the catalog or correct its data, use
this repo.

Catalog inclusion does not automatically enable trading. DigiRare activates a
reviewed subset through separate marketplace configuration.

## Start here

| I want to... | Go here |
| --- | --- |
| Add my collection | [Add a collection](collections/README.md#add-a-collection) |
| Fix a name, description, or link | Find the folder in [`collections/`](collections/) and edit `meta.json` |
| Add, remove, or correct an asset | Edit that collection's `assets.json`; see [asset membership](collections/README.md#asset-membership) |
| Add or correct traits | Edit the asset's `attributes` in `assets.json`; see [traits](#traits) |
| Use my collection's API | Add a local `adapter.ts`; see [collection APIs](docs/adapters.md#collection-adapters) |
| Report a problem without writing code | [Open a collection change request](https://github.com/XCP/marketplace-collections/issues/new?template=collection-change.yml) |
| List an asset for sale | Use [DigiRare](https://digirare.com); no repo change is needed |

For contribution steps, see [CONTRIBUTING.md](CONTRIBUTING.md). GitHub can make
small edits in the browser: open a file, click the pencil, describe the change,
and submit a pull request from the fork GitHub creates.

## Collection folder

```text
collections/<slug>/
  meta.json      name, type, description, and links
  assets.json    reviewed static membership, preferred when available
  adapter.ts     optional collection-operated API adapter
  protocol.json  optional derived-protocol declaration
  README.md      collection-specific notes
  icon.ext       optional square icon: png, jpg, webp, or svg
  logo.ext       optional wide logo
```

The folder name is a stable lowercase kebab-case slug, such as `rare-pepe`.

Useful examples:

- [Age of Rust](collections/age-of-rust/) uses a small static `assets.json`.
- [Kaleidoscope](collections/kaleidoscope/) uses a collection API adapter.
- [Pre-Ethereum](collections/pre-ethereum/) is a computed curated view.
- [Bitcoin Stamps](collections/bitcoin-stamps/) declares indexed protocol membership.

### Collection metadata

`meta.json` contains editorial information only:

```json
{
  "name": "Rare Pepe",
  "kind": "canonical",
  "description": "The original card canon, issued on Counterparty from 2016 to 2018 across 36 series.",
  "links": {
    "website": "https://rarepepedirectory.com"
  }
}
```

Required fields are `name`, `kind`, and `description`. Optional links are
`website`, `x`, and `discord`. See the
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
longname when it is easier to review. DigiRare resolves both forms to the same
compact trading identity and retains the longname for display. See the
[`assets.json` schema](schemas/assets.schema.json).

### Traits

Traits use `{ "trait_type", "value" }`, matching common NFT metadata. DigiRare
currently understands `Artist`, `Series`, and `Card`. Repeat `Artist` for a
collaboration. Other traits are preserved for future use.

Do not put supply, divisibility, issuance dates, ownership, prices, listings,
or sales in this repo. DigiRare derives chain and market facts independently.

### Canonical, curated, primary, and secondary

A `canonical` collection is an asset's main home. An asset represented in
canonical collections has one primary home. CI rejects duplicate primary homes.

A `curated` collection is a view across existing assets, such as Pre-Ethereum.
It does not claim their identity or double-count their activity.

If a canonical collection includes an asset whose primary home is another
collection, keep the entry and mark it secondary:

```json
{ "asset": "SATOSHICARD", "secondary": true }
```

CI names the conflicting collections when it finds a duplicate primary. A
canonical collection must keep at least one primary asset. If every member is
an overlap, use `"kind": "curated"` instead.

## How membership is selected

The first source that exists wins:

1. [`collections/<slug>/assets.json`](collections/)
2. `collections/<slug>/adapter.ts` for a collection-operated API or computed view
3. `collections/<slug>/protocol.json` for a recognized derived protocol
4. an adapter in [`aggregators/`](aggregators/)

There is no silent fallback. If the selected source fails, the build fails. Do
not put assets, adapters, provider URLs, or source configuration in `meta.json`.

An aggregator can help create an initial static snapshot. After `assets.json`
is committed, the static file takes precedence. See the
[collection guide](collections/README.md),
[adapter contract](docs/adapters.md), and
[aggregator guide](aggregators/README.md).

`protocol.json` is reserved for standards such as Bitcoin Stamps whose
membership and protocol ordinal are derived by the marketplace indexer. It is
not a project API setting.

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
- [Open a collection change request](https://github.com/XCP/marketplace-collections/issues/new?template=collection-change.yml)

## Wanted

- **Cake Commons:** no reliable membership list has been found. A PR with a
  verifiable list is welcome.
