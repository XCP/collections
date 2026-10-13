# Repository guide for coding agents

This repository is a public Counterparty collection registry and normalizer.
Keep collection membership and editorial metadata here; do not add chain facts,
market activity, wallet behavior, or marketplace policy.

Before changing an adapter, read `docs/adapters.md` and the README in its
collection or aggregator folder.

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
## Curation standard

Membership and credits are editorial claims, so each needs explicit evidence.
Record the evidence in the pull request description.

- Credit an `Artist` from the work itself (a signature or plate on the card,
  its description or JSON metadata), the project's own catalog, or the
  artist's public claim. An issuing address alone is never enough: one issuer
  can register many artists' work. Use the existing spelling of a known artist.
- Admit an asset to a collection from the project's catalog, its name series,
  or its stated membership, never from visual similarity alone. Unclaimed art
  stays in the Counterparty fallback.
- Set `Art year` only when the art demonstrably appeared later than the
  asset's registration (its first art-bearing description, confirmed by first
  activity). Set `founded` the same way for a project.
- Set `Based on` only when the relationship is explicit (the name embeds the
  original or the metadata says so) and the art confirms it.
- `variation_of` collections hold one parent asset and its subassets only.

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
