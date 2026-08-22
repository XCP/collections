## What changed?

<!-- Name the collection and summarize membership or metadata changes. -->

## Membership source

- [ ] Metadata, links, README, or media only; membership is unchanged
- [ ] Static `assets.json`
- [ ] Collection-operated `adapter.ts`
- [ ] Computed curated `adapter.ts`
- [ ] Derived `protocol.json`
- [ ] Aggregator discovery or import

Public endpoint, if applicable:

<!-- https://... -->

Source-selection rationale, especially when alternatives exist:

<!-- assets.json > collection adapter > aggregator. -->

## Membership impact

<!-- Note additions, removals, primary/secondary changes, and pagination. Write "none" for a metadata-only PR. -->

## Checks

- [ ] I used Counterparty protocol asset identifiers.
- [ ] I ran `node .github/validate.ts`.
- [ ] I ran `node .github/check-source-coverage.ts`.
- [ ] I ran `node .github/run-tests.ts`.
- [ ] Adapter only: I added representative committed fixtures.
- [ ] I did not put assets, adapter names, provider URLs, or source configuration
      in `meta.json`.
- [ ] Adapter only: I used no secrets, new dependencies, filesystem writes, or
      subprocesses.
- [ ] Adapter only: I ran `node scripts/export.ts` as a live smoke test.
