# Counterparty

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 8,062 assets |
| Primary memberships | 8,062 |
| Secondary or curated memberships | 0 |
| Source | Reviewed static `assets.json` |
| Traits | Art year: 17/8,062 (0.2%)<br>Artist: 3,151/8,062 (39.1%) |
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

## RAREPEPELORE attribution: 2026-10-10

The chain-linked [exact-asset JSON](https://raw.githubusercontent.com/subterranean1/jsons/refs/heads/main/rarepepelore.json) is hosted by subterranean1, signs the work as subterranean, and links that artist’s X and Linktree profiles. Correct the earlier CTC credit to subterranean. Issuance from CTC’s address is not authorship evidence; the card’s dedication to Cody is consistent with a gifted work. This changes only the artist credit.

## OKAYLIGHTHD recovery

Added 2026-10-10 after recovering its original animated artwork from https://raw.githubusercontent.com/parispsalter/forge/main/OKAYLIGHTHD.json . The JSON names the exact asset and issuer 1AStcZCyVeVuMxaXSKfHTcg45qGDZ6Hdxk; the image visibly signs PARISIANFORGE. Original full image: https://i.imgur.com/GFHddrx.gif . It remains in Counterparty pending evidence of a named collection. Metadata supply/lock fields are historical and are not imported as current chain facts.

## Artist attribution review (2026-10-10)

Issuer-linked [original metadata](https://github.com/subterranean1/jsons) explicitly credits subterranean for: BITCORNKING, COCODILE.tears, CORNTAINER, GMOPIGEONS, GREYWHALIEN, ONLYCANS, PEPELETTER, PEPESHOOD, PIXELLIMIT, RAREPEPEPINK, TOPFLOORPEPE.legend, FAUXCORNHOLE, FUNKYWENHEN, GOGOGHOST, PEPEPAUL, POTPIGEON, THISGOAT. Each asset identity and its issuance description URL were checked individually; repository ownership alone was not used as attribution. WOJAKPROF’s [original metadata](https://arweave.net/qh0HGe2TpUyMKVOKNZeLJsU9OF5PgoD2SKiqfdR6Pno) names MemeKingArt x subterranean, now stored as separate individual credits. Existing collection homes are retained. The adapter-backed PEPESHOOD credit is preserved on refresh without introducing membership.

### The Rarest Tote

Added RARESTSETS.The_Rarest_Tote after verifying its numeric identity A6334554298574301439 and positive supply against xcpio-core. The issuance links [original metadata](https://raw.githubusercontent.com/subterranean1/jsons/refs/heads/main/RARESTSETS.The_Rarest_Tote), which explicitly credits subterranean x Amy DiGi and describes the NFT.NYC 2025 Scarce.City auction. The original photograph and recovered CDN card were inspected. Both artists receive separate credits. This single documented work does not establish membership for the broader RARESTSETS namespace.

### ZOMBIEPPS attribution

The [onchain-linked original JSON](https://blue-useful-vole-281.mypinata.cloud/ipfs/bafybeie3qaa5dzfbf3okospfx2bxyqsr4ugifgx37pfk47iva7a2hwkyi4/ZOMBIEPPS.JSON) explicitly names ZOMBIEPPS, credits Gus Grillasca, and describes the 2026 tenth-anniversary Zombie Pepes homage, matching the CDN artwork. Add the individual artist credit. The metadata directory label alone does not prove Fake Rares acceptance, so Counterparty membership remains until directory evidence supports a move.

Scarce City explicitly credits Gus Grillasca and links the exact Counterparty tokens for [RATPOISON](https://scarce.city/auctions/rat-poison), [PEPECREDIT](https://scarce.city/auctions/pepe-credit), and [BTCBANKNOTE](https://scarce.city/auctions/btc-banknote-miami-2022). These credits are added without assigning a new collection. The BTCBANKNOTE sale also explicitly equates Gus Grillasca with GusGG; the reviewed alias normalizes Gus gg credits on future exports. No redemption rights are inferred from historic auction descriptions.
