# Counterparty

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 9,307 assets |
| Primary memberships | 9,307 |
| Secondary or curated memberships | 0 |
| Source | Reviewed static `assets.json` |
| Traits | Art year: 23/9,307 (0.2%)<br>Artist: 4,166/9,307 (44.8%) |
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

Counterparty (`counterparty`) is a primary-only catch-all for assets without a project collection. When an asset gains another primary home, remove its Counterparty membership instead of marking it secondary. Validation rejects secondary Counterparty memberships from static files and adapter exports; other collections may still have secondary memberships.

Counterparty is an exclusive fallback. The source list contains candidates; the full export excludes any candidate present in another collection and carries its artist credits and missing traits to the canonical project home. Artist pages remain independent of collection membership.

## Tizar Berandalan and Choni BDG credits

Reviewed 2026-10-09: Scarce City's original sale pages credit both artists on [The Fall of the Bretton Woods System](https://scarce.city/sales/fall-of-the-bretton-woods-system), [The End of Fiat Moneii](https://scarce.city/sales/end-of-fiat-moneii-print), and [Bitcoin is the People's Liberation Army](https://scarce.city/sales/liberation-army-print). Direct source-image comparisons confirm the compositions on TIZARBTCART.THEFALL, FALLOFBRETTONWOODS, FALOFBRETTONWOODS, POMPEII, THEFIATMONEIIPRNT, and TANKMANPRINT. The two Bretton Woods spelling variants use a red flag, while THEFALL matches the source's orange flag; both share the same underlying composition. All six retain Tizar Berandalan and add Choni BDG separately.

TIZARBTCART.TANKMAN and TIZARBTCART.THEFIATMONEIIFRM have unavailable CDN images, so their attribution is held pending confirmation. No blanket issuer attribution is made.

## Rare Scrilla and Wizard X

Reviewed 2026-10-09: the artwork for PEPEGOAT.WIZARD_X_GOAT explicitly credits RARE SCRILLA X WIZARDX below the image. Retain Rare Scrilla and add the existing canonical Wizard X artist as a separate Artist trait. The asset remains in Counterparty; no attribution change is inferred for the PEPEGOAT parent. Evidence: https://cdn.xcp.io/img/card/PEPEGOAT.WIZARD_X_GOAT .
