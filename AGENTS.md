# Repository guide for coding agents

This repository is a public Counterparty collection registry and normalizer.
Keep collection membership and editorial metadata here; do not add chain facts,
market activity, wallet behavior, or marketplace policy.

Before changing an adapter, read `docs/adapters.md` and the README in its
collection or aggregator folder.

## Add or correct one collection

Most tasks here are one person, often working with an AI assistant, adding
their project or fixing one collection. Keep the change to that collection.

1. **Find the folder.** Search `collections/*/meta.json` for the project's
   name. If it exists, edit it; otherwise create `collections/<slug>/` with a
   stable kebab-case slug.
2. **`meta.json`.** Name, `kind: "canonical"`, a short factual description,
   `art_frame` (`card`, `square` or `landscape`), and `links` the project
   publishes. Add `founded` only when the launch year is known.
3. **`assets.json`.** List every asset the project names as its own, from its
   own catalog, site or announcement. Use Counterparty asset names; list a
   subasset by its longname; a numeric asset (`A…`) also needs an entry in
   `data/numeric-assets.json` (`npm run numeric:resolve`). Confirm each asset
   exists on [xcp.io](https://xcp.io).
4. **Assets already in the registry.** `grep` each asset across
   `collections/*/assets.json`. If it sits in `collections/counterparty/`
   (the fallback for art no project has claimed), remove it there. If another
   project already lists it, keep that home and add yours with
   `"primary": false`, or explain in the pull request why it should move.
5. **Traits.** Add only what the project publishes: `Artist` (repeat it for a
   collaboration; reuse an artist's existing spelling), `Series`, `Card`.
   Leave a trait out rather than guess. An issuing address alone does not
   show who the artist is.
6. **`README.md`.** A heading with the collection name and a few lines on what
   belongs and where the list comes from.
7. **Check and open the pull request.** Run `npm run docs`, then
   `npm run check`, and fix what it reports. In the pull request, link the
   source of the asset list and of any artist credits.

Do not edit other collections, retag assets in bulk, or rename existing
artists or collections in the same pull request; open a separate change.

## Adapter task recipe

1. Source precedence is `collections/<slug>/assets.json`, then that folder's
   `adapter.ts`, then the providers under `aggregators/`. Never add a silent
   fallback after a selected source fails.
2. Keep `meta.json` editorial only. It must not contain assets, adapter names,
   provider URLs, `feed`, or `source_class`.
3. Put collection-operated code beside its metadata. Put third-party provider
   code in `aggregators/<provider>/adapter.ts`. Export
   `async load({ collection, fetchJson, fetchText, cache })`.
4. Use the injected bounded `fetchJson` or `fetchText`, not global `fetch`.
5. Return an asset array or a valid feed-v1 document.
6. Add representative fixtures and deterministic tests for every adapter.
7. Do not add npm dependencies, secrets, writes, subprocesses, or reliance on a
   live endpoint in unit tests.
8. Never execute contributed adapter code with `pull_request_target`, write
   permissions, persisted Git credentials, or repository secrets.
## Checks

Run with Node.js 22:

```sh
node .github/validate.ts
node .github/check-source-coverage.ts
node .github/run-tests.ts
node scripts/export.ts
node scripts/generate-readmes.ts --check
```

`npm run check` runs all five. After changing membership or traits, run
`npm run docs` to regenerate README facts blocks.

The export command writes ignored output under `dist/`. Do not commit generated
output. If the adapter or normalized contract changes, update schemas, tests,
README files, and the adapter guide together.
