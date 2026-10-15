# Pantherfive

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 10 assets |
| Primary memberships | 10 |
| Secondary or curated memberships | 0 |
| Source | Reviewed static `assets.json` |
| Traits | Artist: 10/10 (100%)<br>Based on: 7/10 (70%) |
<!-- collection-facts:end -->

## Membership evidence

Reviewed 2026-10-09 using xcpio-core identities and namespace records plus direct visual comparison of every member through the image CDN. The Pantherfive and Pantherfake parents and their children show the same roaring panther design in colour, resolution and animated variants. Both explicit namespaces are included after visual comparison.

The explicit list contains 10 art-bearing members. Existing Darky credits are retained. PANTHERFIVE.HI is newly registered, supported by its namespace, issuer and matching signed artwork. Visually similar editions retain their distinct token identities.

Counterparty appearances are removed. Existing Fake Rares and Fake Commons primary memberships are preserved, with this family secondary for those assets. No acceptance into either directory is inferred for the remaining siblings.

The easyasset.art metadata was unavailable; it is not cited as readable evidence. No verified project homepage was found.

## Project year

**2022** — Estimated from the matching artwork/JSON reference and positive edition issuance within 90 days, in the context of the reviewed membership above. Anchor: [PANTHERFIVE.73H](https://api.xcp.io/v2/assets/A16486747701269316686/issuances?limit=100). See the [coverage review](../../docs/collection-date-coverage-2026-10-13.md) for the shared method and limits.

## Consolidation review, 2026-10-15

One variations group contains all ten exact tokens. The former `pantherfive-variants`
entry repeated eight of them as secondary memberships and excluded PANTHERFAKE and
PANTHERFAKE.HI only because those use another namespace. Direct comparison shows
that both namespaces use the same roaring panther composition, with colour,
resolution and animated treatments. Namespace boundaries do not establish a
separate art project.

- [PANTHERFIVE artwork](https://cdn.xcp.io/img/full/PANTHERFIVE)
- [PANTHERFAKE artwork](https://cdn.xcp.io/img/full/PANTHERFAKE)
- [PANTHERFIVE.73H](https://api.xcp.io/v2/assets/A16486747701269316686/issuances?limit=100)
- Exact member list and existing Darky credits remain unchanged in `assets.json`.
- The seven PANTHERFIVE children retain their explicit parent relationship through
  `Based on: PANTHERFIVE`; their names and matching artwork support this relation.
  No ancestry is inferred between PANTHERFAKE and PANTHERFIVE.

Use `editorial_type: variations`, not `variation_of`: this grouping spans two
namespaces and does not assert which parent was the original or that PANTHERFAKE
is a subasset of PANTHERFIVE. The redundant eight secondary memberships are removed;
no token, credit, chronology or surviving primary placement is changed. Marketplace
must redirect the retired `/x/pantherfive-variants` route to `/x/pantherfive` and must
not transfer signed offers between collection scopes.
