# Aggregators

Aggregator adapters are last-resort import and ingestion sources for
collections without a reviewed `assets.json` snapshot, a collection-operated
adapter, or a marketplace-indexed exception documented in that collection's
folder.

Each provider occupies one folder:

```text
aggregators/<provider>/
  adapter.ts
  README.md
```

An aggregator adapter receives the collection slug and returns a complete
normalized asset list when the provider recognizes it. It returns `undefined`
when the provider does not contain that collection. Provider-specific catalog
discovery, pagination, retry behavior, and response validation stay inside the
provider adapter.

Aggregators never appear in a collection's `meta.json`, and there is no mirrored
`aggregators/<provider>/collections/` hierarchy. When an aggregator is used to
seed a reviewed collection, its output is committed as that collection's
`assets.json`; the static file then wins on future ingestion.

If multiple aggregators return the same source-less collection, materialization
fails rather than choosing silently. A reviewer can resolve the ambiguity by
committing `assets.json` or adding a collection-operated adapter.
