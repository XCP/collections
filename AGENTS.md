# Repository guide for coding agents

This repository is a public Counterparty collection registry and normalizer.
Keep collection membership and editorial metadata here; do not add chain facts,
market activity, wallet behavior, or marketplace policy.

Before changing an adapter, read `docs/adapters.md` and the README in its
collection or aggregator folder.

## Adapter task recipe

1. Source precedence is `collections/<slug>/assets.json`, then that folder's
   `adapter.ts`, then its reserved `protocol.json`, then the providers under
   `aggregators/`. Never add a silent fallback after a selected source fails.
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
9. Use `protocol.json` only for a recognized standard whose membership and
   ordinal are derived by the marketplace indexer, not for an ordinary API.

Run with Node.js 22:

```sh
node .github/validate.ts
node .github/check-source-coverage.ts
node .github/run-tests.ts
node scripts/export.ts
```

The export command writes ignored output under `dist/`. Do not commit generated
output. If the adapter or normalized contract changes, update schemas, tests,
README files, and the adapter guide together.
