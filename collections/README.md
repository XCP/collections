# Add or update a collection

Each collection has one folder named with a stable kebab-case slug:

```text
collections/<slug>/
  meta.json
  assets.json       # reviewed static membership, when available
  adapter.ts       # optional collection-operated API adapter
  protocol.json    # derived-standard declaration, only when applicable
  README.md
```

## The usual contribution

For most collections, submit `meta.json` and `assets.json`.

`meta.json` describes the collection and contains no API configuration:

```json
{
  "name": "Example Collection",
  "kind": "canonical",
  "description": "A short factual description.",
  "links": {
    "website": "https://example.com/"
  }
}
```

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

## A collection-operated API

If the project maintains a complete membership API, it may add
`collections/<slug>/adapter.ts`. The adapter is discovered by its location;
nothing is added to `meta.json`.

The source precedence is fixed:

1. `assets.json`;
2. the collection's `adapter.ts`;
3. `protocol.json`, for a recognized standard populated by the consumer indexer;
4. a top-level aggregator;
5. otherwise the collection cannot be materialized.

If a higher-precedence source exists but is invalid, validation fails. Tooling
does not silently fall through to a lower-precedence source.

`protocol.json` is exceptional. It contains only a stable protocol id and is
appropriate when membership is an indexed protocol fact with its own ordinal,
as with Bitcoin Stamps. It is not a substitute for a project membership API.

## Make a pull request

You may add a collection or correct an existing one. Update the folder's
README if it would help explain the project, its membership, or an unusual
choice. Pull requests should describe the change and how reviewers can verify
it.

Run:

```sh
npm run check
```
