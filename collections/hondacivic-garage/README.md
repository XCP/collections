# HONDACIVIC Garage

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 26 assets |
| Primary memberships | 26 |
| Secondary or curated memberships | 0 |
| Source | Collection-operated `adapter.ts` |
| Traits | Car: 26/26 (100%)<br>Card: 25/26 (96.2%)<br>Series: 26/26 (100%)<br>Tier: 26/26 (100%) |
<!-- collection-facts:end -->

Membership is read from the garage's own public mint API
(`https://milliondollarbillboard.net/api/garage/mint`) by `adapter.ts`. The adapter requests each season explicitly: the default endpoint shows only
the current season. Delivered cards are `HONDACIVIC.S<season>.<number>`
subassets, plus the explicitly flagged `HONDACIVIC.S<season>.CHAMPION` award. `Series` and
`Card` come from that identity (Champion has no numeric Card trait); the other traits are the ones committed and
inscribed at mint. Empty slots registered ahead of a pull, pulled cards not
yet delivered, and the HONDACIVIC currency itself are not members.

Every delivered card must belong to a season listed in the API rules; a new
season simply adds its cards.

To correct the collection description, links, adapter, or this README, open a
pull request against this folder. Adapter changes need fixture-backed tests.

Read the [collection guide](../README.md),
[adapter contract](../../docs/adapters.md), and
[contribution steps](../../CONTRIBUTING.md). This repo does not create sale
listings. If you cannot prepare a pull request,
[open a collection change request](https://github.com/XCP/collections/issues/new?template=collection-change.yml).
