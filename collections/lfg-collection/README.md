# LFG Collection

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 160 assets |
| Primary memberships | 159 |
| Secondary or curated memberships | 1 |
| Source | Reviewed static `assets.json` |
| Traits | Artist: 104/160 (65%)<br>Card: 1/160 (0.6%)<br>Series: 1/160 (0.6%) |
<!-- collection-facts:end -->

This folder is the public record for this collection.

- Fix the name, description, or links in `meta.json`.
- Add, remove, or correct assets and traits in `assets.json`.
- Change `adapter.ts` only if this collection operates the membership API.
- Update this README with useful project-specific guidance.
- This repo does not create sale listings.

Read the [collection guide](../README.md) and
[contribution steps](../../CONTRIBUTING.md), then open a pull request explaining
the change and how to verify it. If you cannot prepare a pull request,
[open a collection change request](https://github.com/XCP/collections/issues/new?template=collection-change.yml).

## Catalog audit: 2026-10-10

The project-operated directory at https://www.lfgcrypto.art/lfgcards explicitly lists FAKPROPHECY as LFG4-C01 and links its Counterparty token. The CDN artwork also bears LFG COLLECTION. Add it as the primary home, preserve its existing artist credit, and remove Counterparty fallback membership.

The directory mixes Counterparty, Dogeparty and cp20 links: names on other networks are not evidence for Counterparty membership. This audit resolved all 105 unique tokenscan.io Counterparty names against xcpio-core; 101 already had LFG membership. The remaining LFGAUCTION, LFGTWO and LFGTHREE are described as auction/wallet-ownership tokens, have no artwork URL in their chain descriptions, and display CDN placeholders. They remain excluded pending actual artwork. Existing members outside this page snapshot are not removed without reviewing their original evidence.

## Artist metadata audit: 2026-10-10

Added CTC credits to 39 existing members whose chain-linked Arweave JSON exactly identifies the asset and explicitly signs it as CTC, CODYTHECAMPBELL or Cody the Campbell. These files link the same LFGcryptoart identity already used by the artist profile. Memberships are unchanged. Identifier mismatches (SHUXPEPE/SHUXSPEPE) and ambiguous CYC signatures were excluded from this pass.
