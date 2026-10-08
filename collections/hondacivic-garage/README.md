# HONDACIVIC Garage

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 6 assets |
| Primary memberships | 6 |
| Secondary or curated memberships | 0 |
| Source | Collection-operated `adapter.ts` |
| Traits | Backdrop: 6/6 (100%)<br>Banner: 2/6 (33.3%)<br>Battle scar: 1/6 (16.7%)<br>Body: 5/6 (83.3%)<br>Build boost: 5/6 (83.3%)<br>Car: 6/6 (100%)<br>Card: 6/6 (100%)<br>Condition: 1/6 (16.7%)<br>Edition: 6/6 (100%)<br>Engine: 6/6 (100%)<br>Finish: 6/6 (100%)<br>First pull: 4/6 (66.7%)<br>Founder plate: 6/6 (100%)<br>Front: 5/6 (83.3%)<br>Glow: 5/6 (83.3%)<br>Inside: 5/6 (83.3%)<br>Last race: 6/6 (100%)<br>Lights: 5/6 (83.3%)<br>Nitro: 1/6 (16.7%)<br>Odometer: 6/6 (100%)<br>Paint: 6/6 (100%)<br>Podium: 1/6 (16.7%)<br>Power: 6/6 (100%)<br>Rear: 5/6 (83.3%)<br>Record: 6/6 (100%)<br>Roof: 5/6 (83.3%)<br>Season part: 4/6 (66.7%)<br>Series: 6/6 (100%)<br>Stance: 5/6 (83.3%)<br>Standing: 6/6 (100%)<br>Tint: 5/6 (83.3%)<br>Tires: 6/6 (100%)<br>Victory Lap: 1/6 (16.7%)<br>VIN: 6/6 (100%)<br>VTEC: 5/6 (83.3%)<br>Wear: 6/6 (100%)<br>Weight reduction: 6/6 (100%)<br>Wheels: 1/6 (16.7%) |
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
