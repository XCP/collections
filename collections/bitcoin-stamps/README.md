# Bitcoin Stamps

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | Indexed by the marketplace |
| Primary memberships | Determined during marketplace ingest |
| Secondary or curated memberships | Determined during marketplace ingest |
| Source | Marketplace indexer |
| Traits | None |
<!-- collection-facts:end -->

This is the Bitcoin Stamp **art** set, not every row indexed by Stampchain. It
includes positive-numbered Counterparty `STAMP` and `SRC-721` records. It
excludes fungible `SRC-20` activity and, for now, the negative-numbered
`cursed` and `posh` categories.

This is a marketplace-indexed collection rather than a static membership list.
The marketplace maintains the general Counterparty `assets` table, identifies
Stamp assets during protocol ingest, and retains each asset's Stamp ordinal and
identifier. If an asset already has a more specific primary collection, its
Bitcoin Stamps membership is secondary. Media remains the normal
`cdn.xcp.io/img/{icon,full}/{ASSET}` convention; Stampchain image URLs are not
stored in the collection registry. The folder deliberately does not embed tens
of thousands of mutable memberships in this repository.

## Upstream definition

The policy follows Stampchain's own implementation:

- [`STAMP_TYPES`](https://github.com/stampchain-io/stampchain.io/blob/6e67b71d60f744981ff33dea06b28c3fa1e1299e/lib/constants/stampConstants.ts#L24-L36)
  distinguishes classic, cursed, Posh, SRC-20, and the broader `stamps` bucket.
- [the query predicates](https://github.com/stampchain-io/stampchain.io/blob/6e67b71d60f744981ff33dea06b28c3fa1e1299e/server/database/stampRepository.ts#L143-L162)
  define the positive A-asset class used here.
- [the controller identifier mapping](https://github.com/stampchain-io/stampchain.io/blob/6e67b71d60f744981ff33dea06b28c3fa1e1299e/server/controller/stampController.ts#L204-L216)
  shows that the broad art bucket is `STAMP` plus `SRC-721`.
- [the official indexer protocol guide](https://github.com/stampchain-io/btc_stamps/blob/20accccb2d363184872481dd323fb114d8e0a4c8/docs/PROTOCOLS.md#classic-stamps)
  documents classic Stamp validation and the separate SRC protocols.

The marketplace implements this derivation. This README records the boundary;
the folder has no API adapter or checked-in membership snapshot.

Read the [collection guide](../README.md) and
[contribution steps](../../CONTRIBUTING.md) before proposing a policy change.
This repo does not create sale listings. If you cannot prepare a pull request,
[open a collection change request](https://github.com/XCP/collections/issues/new?template=collection-change.yml).
