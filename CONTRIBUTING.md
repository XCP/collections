# Contributing

Membership and metadata are maintained in collection folders. DigiRare uses
filesystem conventions rather than API configuration inside `meta.json`.

## Add or update a collection

1. Add or edit `collections/<slug>/meta.json`.
2. Add the complete reviewed membership to `assets.json` whenever possible.
3. Add `adapter.ts` only when the collection itself operates a complete API.
4. Add or edit the collection's `README.md`; collection representatives are
   welcome to replace the generic text with project-specific information.
5. Add optional icons or logos alongside those files.
6. Run the checks below and open a pull request.

Read [`collections/README.md`](collections/README.md) for the exact shapes.
An asset entry uses a Counterparty identifier and optional OpenSea-style traits:

```json
{
  "asset": "EXAMPLECARD",
  "attributes": [
    { "trait_type": "Artist", "value": "Alice" },
    { "trait_type": "Series", "value": 1 },
    { "trait_type": "Card", "value": 4 }
  ]
}
```

If an asset's primary home is another canonical collection, include it with
`"secondary": true` instead of creating a second primary membership.

## Source conventions

Precedence is `assets.json`, then the collection's `adapter.ts`, then a reserved
`protocol.json`, then a top-level aggregator. A malformed selected source
fails; it does not fall through. Do not place `assets`, `adapter`, `feed`, provider URLs, or
`source_class` in `meta.json`.

Collection API adapters live beside their metadata:

```text
collections/<slug>/adapter.ts
```

General third-party providers live in their own top-level folders:

```text
aggregators/<provider>/adapter.ts
```

A derived standard may instead declare only
`collections/<slug>/protocol.json`. This is reserved for protocols such as
Bitcoin Stamps whose membership and ordinal are indexed by the marketplace;
it is not configuration for an ordinary project API.

Do not create a mirrored collection hierarchy under an aggregator. Read
[`docs/adapters.md`](docs/adapters.md) before changing executable source code.
Adapters must use the injected bounded fetch helpers and must not embed
credentials, add dependencies, write files, invoke subprocesses, or rely on
mutable environment variables.

## Local checks

Use Node.js 22. The repository intentionally has no runtime or development
dependencies, so there is no install step.

```sh
node .github/validate.ts
node .github/check-source-coverage.ts
node .github/run-tests.ts
node scripts/export.ts
```

The first three commands are deterministic and run in pull-request CI. Export
materializes the conventional sources and writes ignored
`dist/collections.json`. For the normal static collection, it performs no
network request.

## Pull-request expectations

Describe:

- the collection and membership being added or changed;
- whether members were added, removed, moved, or marked secondary;
- the public endpoint when adding a collection or aggregator adapter;
- pagination or unusual response behavior handled by an adapter;
- why executable adapter code is needed instead of `assets.json`.

Do not commit generated `dist/` output. CI executes contributed adapters only
on the unprivileged `pull_request` workflow with no secrets and a read-only
token. Repository workflows must never execute contributed adapter code through
`pull_request_target`.
