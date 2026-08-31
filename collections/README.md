# Add or update a collection

This is the practical guide for collection owners and contributors. Sale
listings belong in marketplace applications. This folder changes collection
catalog data only.

Each collection has one folder named with a stable kebab-case slug:

```text
collections/<slug>/
  meta.json
  assets.json       # reviewed static membership, when available
  adapter.ts        # optional collection-operated API adapter
  README.md
```

## Add a collection

For most collections, submit `meta.json` and `assets.json`.

### Collection metadata

`meta.json` describes the collection and contains no API configuration:

```json
{
  "name": "Example Collection",
  "kind": "canonical",
  "description": "A short factual description.",
  "art_frame": "card",
  "links": {
    "website": "https://example.com/"
  }
}
```

`art_frame` is optional. Use `card`, `square`, or `landscape` only when the
collection artwork consistently uses that shape. Consumers may use it to fit
art without cropping or letterboxing.

### Asset membership

`assets.json` is the complete reviewed membership snapshot:

```json
{
  "assets": [
    { "asset": "EXAMPLECARD" },
    {
      "asset": "ANOTHERCARD",
      "attributes": [
        { "trait_type": "Artist", "value": "Alice" },
        { "trait_type": "Series", "value": 1 },
        { "trait_type": "Card", "value": 2 }
      ]
    }
  ]
}
```

Use `"secondary": true` when an asset appears here but has its canonical home
in another collection.

Also add a short `README.md` telling contributors what belongs in the
collection and how to verify changes. Optional `icon.png`, `icon.jpg`,
`icon.webp`, `icon.svg`, and matching `logo` files may live beside it.

## Correct a collection

- Wrong name, description, or link: edit `meta.json`.
- Missing or extra asset: edit `assets.json`.
- Wrong artist, series, card, or other trait: edit that asset's `attributes`.
- Asset belongs here but has a primary home elsewhere: add `"secondary": true`.
- Wrong supply, divisibility, issuer, owner, or issuance date: do not copy the
  correction here. Those are chain facts, not collection metadata.

Find the collection in the [folder list](./), edit the smallest relevant file,
and explain how reviewers can verify the correction.

## A collection-operated API

If the project maintains a complete membership API, it may add
`collections/<slug>/adapter.ts`. The adapter is discovered by its location;
nothing is added to `meta.json`.

The source precedence is fixed:

1. `assets.json`;
2. the collection's `adapter.ts`;
3. a top-level aggregator;
4. otherwise the collection cannot be materialized.

If a higher-precedence source exists but is invalid, validation fails. Tooling
does not silently fall through to a lower-precedence source.

## Make a pull request

You may add a collection or correct an existing one. Update the folder's
README if it would help explain the project, its membership, or an unusual
choice. Pull requests should describe the change and how reviewers can verify
it.

For a small correction on GitHub, open the file and click the pencil. GitHub
will create a fork when needed. For a new collection, fork the repo, use
**Add file**, create each `collections/<slug>/...` file, then open a pull
request from your fork.

Run:

```sh
npm run check
```

No install step is required. If you cannot run Node.js locally, submit the pull
request anyway. GitHub CI runs the same checks and reports the exact file and
entry that needs attention.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for review expectations or
[open a collection change request](https://github.com/XCP/collections/issues/new?template=collection-change.yml)
if you cannot prepare the change yourself.
