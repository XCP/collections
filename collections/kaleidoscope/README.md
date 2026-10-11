# Kaleidoscope

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 2,110 assets |
| Primary memberships | 1,734 |
| Secondary or curated memberships | 376 |
| Source | Collection-operated `adapter.ts` |
| Traits | Art year: 11/2,110 (0.5%)<br>Artist: 783/2,110 (37.1%)<br>Kaleidoscope ID: 2,110/2,110 (100%) |
<!-- collection-facts:end -->

Membership is read from Kaleidoscope's own public search API by `adapter.ts`.
Reviewed individual credits supplement the API's membership-only response:
[PEPESHOOD original metadata](https://raw.githubusercontent.com/subterranean1/jsons/main/PEPESHOOD.json)
credits subterranean; [PEPEFAKERARE's artwork](https://cdn.xcp.io/img/full/PEPEFAKERARE)
is explicitly signed BigToX, matching BIGTOX's issuer and existing canonical credit.
These credits do not infer official Fake Rares acceptance or introduce API membership.
TMDAUTOGRAPH is credited to ArtemTemaDa: its [issuer-linked original JSON](https://xcp.coindaddy.io/TMDAUTOGRAPH.json)
explicitly names ArtemTemaDa and links the same Instagram handle printed on the artwork.
This corrects an earlier SIV attribution inherited from the Counterparty fallback source;
the issuer is not sufficient evidence of authorship. Its existing membership is unchanged.
CYPHERPOOHNK is credited to Remster: its [original onchain-linked JSON](https://mm6l5djejjshrab6acprjhx2del3ypoggvujsqsb5kcdrdmf6f3a.ar.io/Yzy-jSRKZHiAPgCfFJ76GRe8PcY1aJlCQeqEOI2F8XY?.json)
names rEMSTER and links Remster's artist profile. This replaces the CHAILATTE
credit inherited from the issuing address without changing collection membership.
Kaleidoscope is an open project: when an asset already has a primary home in a
more specific collection, the registry automatically keeps that home and marks
the Kaleidoscope appearance secondary.

To correct the collection description, links, adapter, or this README, open a
pull request against this folder. Adapter changes need fixture-backed tests.

Read the [collection guide](../README.md),
[adapter contract](../../docs/adapters.md), and
[contribution steps](../../CONTRIBUTING.md). This repo does not create sale
listings. If you cannot prepare a pull request,
[open a collection change request](https://github.com/XCP/collections/issues/new?template=collection-change.yml).
