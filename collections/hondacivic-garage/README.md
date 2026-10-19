# HONDACIVIC Garage

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 14 assets |
| Primary memberships | 14 |
| Secondary or curated memberships | 0 |
| Source | Collection-operated `adapter.ts` |
| Traits | Car: 14/14 (100%)<br>Card: 14/14 (100%)<br>Series: 14/14 (100%)<br>Tier: 14/14 (100%) |
<!-- collection-facts:end -->

Membership is read from the garage's own public mint API
(`https://milliondollarbillboard.net/api/garage/mint`) by `adapter.ts`. Every
delivered card is a `HONDACIVIC.S<season>.<number>` subasset. `Series` and
`Card` come from that identity; the other traits are the ones committed and
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
