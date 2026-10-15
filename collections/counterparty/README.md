# Counterparty

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 6,610 assets |
| Primary memberships | 6,610 |
| Secondary or curated memberships | 0 |
| Source | Reviewed static `assets.json` |
| Traits | Art year: 212/6,610 (3.2%)<br>Artist: 3,350/6,610 (50.7%)<br>Based on: 153/6,610 (2.3%) |
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

### Explicit metadata credits: 2026-10-11

The following chain-linked metadata records identify the exact asset (or its verified subasset longname) and explicitly name the creator in the `pgpsig` attribution field. CDN previews were reviewed. This field is treated as a published attribution, not a cryptographically verified signature. Existing artist spellings are reused. These are individual credits, not a blanket attribution of an issuer, and collection membership is unchanged. Full audiovisual review remains separate.

| Asset | Artist | Original metadata |
| --- | --- | --- |
| IHATENFTZ | Viva La Vandal | [JSON](https://easyasset.art/j/9dk9ld/IHATENFTZ.json) |
| PEPEROLLER | future_shock_17 | [JSON](https://arweave.net/nC-3RfkbKuMrQybbhHJB9II6VG0Oh7eeBdImeznFKN0) |
| DANKBRIBE | pitoopi | [JSON](https://api.npoint.io/2071709a08c326859fba.json) |
| NINTENBIT | pitoopi | [JSON](https://api.npoint.io/949b3caaf3674970434a.json) |
| BUTTERKEEPER | BobbyZoo | [JSON](https://zljvqjqahmhlr7t2bphajh7wzk42ssfjrcjthwqfuledoe6eacpa.ar.io/ytNYJgA7Drj-egvOBJ_2yrmpSKmIkzPaBaLINxPEAJ4?.json) |
| CLAMPERPEPE | Arvik | [JSON](https://ardrive.net/zNwjSxd_S7e5Czw8WpZ5dOdVohAs4XBBSl70igyTV0E/CLAMPERPEPE.json) |
| DEUSVULTPEPE | Arvik | [JSON](https://ardrive.net/Bd0Boys6UsARqCn5JU63rVXjk4NswlmLq9xLRuzA0TU/DEUSVULTPEPE.json) |
| PEPELOHIM | Arvik | [JSON](https://arweave.net/p_e3_YoByUY_PUqXUQ3Bos5Neh6ZOesG4fU8LqMaEZI) |
| PEPEVEIL | Arvik | [JSON](https://ardrive.net/i3eRJuLLftFsZ9v4wL6_G0hsQUmk9pqz00ze5c-2FRQ/PEPEVEIL.json) |
| UNMARKEDONE | Arvik | [JSON](https://ardrive.net/IiaQZX5BwACK9-GPH-kWftkuOCyW5-KNbnB75epCsXo/UNMARKEDONE.json) |
| RVIKSMPORIUM.LOT.ZERO | Arvik | [JSON](https://raw.githubusercontent.com/Arvik78/Card-Jsons-/refs/heads/main/RVIKSMPORIUM.LOT.ZERO) |
| GLITCHRIDER | Arvik | [JSON](https://raw.githubusercontent.com/Arvik78/Card-Jsons-/refs/heads/main/GLITCHRIDER) |
| LIQDNITROPEN | Arvik | [JSON](https://raw.githubusercontent.com/Arvik78/Card-Jsons-/refs/heads/main/LIQDNITROPEN) |
| ORANGERIDER | Arvik | [JSON](https://raw.githubusercontent.com/Arvik78/Card-Jsons-/refs/heads/main/ORANGERIDER) |
| PENGUINNING | Arvik | [JSON](https://raw.githubusercontent.com/Arvik78/Card-Jsons-/refs/heads/main/PENGUINNING) |
| TROJANFROG | Arvik | [JSON](https://raw.githubusercontent.com/Arvik78/Card-Jsons-/refs/heads/main/TROJANFROG) |
| REAGANOMICS.HALLWAYKIDS | Kane Mayfield | [JSON](https://easyasset.art/j/4o7msj/REAGA.json) |
| MAYFAKEFIELD.FAKESTYLE | Kane Mayfield | [JSON](https://xcp.coindaddy.io/A12990154842976048177.json) |
| HANDPRINTS.airdrop | Kane Mayfield | [JSON](https://xcp.coindaddy.io/A13739292845755644173.json) |
| BEHOLDAPEPE | Kane Mayfield | [JSON](https://zl5esxcwwnwprqr4hkw2xlcuflifg5dbkjqujjchefalrrlrlqcq.ar.io/yvpJXFazbPjCPDqtq6xUKtBTdGFSYUSkRyFAuMVxXAU/dankd.json) |
| BITPWRPLEB | Bcarver | [JSON](https://arweave.net/A3TmhFEsWYlppPxlxDzfa9RBQKoESOpchB5meJ55NZY) |
| CNTRLCASTING | Bcarver | [JSON](https://assets.rarepigeons.com/meta/CNTRLCASTING_1781191596.json) |
| PENPENAERIAL | Bcarver | [JSON](https://xem72zzevu5sat7iyyom3jv7dhvzdey65oz32tjh7nu3a6q4oqaq.ar.io/uRn9ZyStOyBP6MYczaa_GeuRkx7rs71NJ_tpsHocdAE?.json) |
| PEPECHARLIE | Bcarver | [JSON](https://assets.rarepigeons.com/meta/PEPECHARLIE_1781193952.json) |
| PSYOPPEPE | Bcarver | [JSON](https://arweave.net/j_EBZ8Okh4SF74HO-ytqJ354Wds14kAt41PDQnDw-eo) |
| TOKENEYEZED | Bcarver | [JSON](https://raa7f2y5acozklk25ouhm7jhey2swr54z26zcuyztl2wvab5zfvq.ar.io/iAHy6x0AnZUtWuuodn0nJjUrR7zOvZFTGZr1aoA9yWs?.json) |
| TOKENEYZER | Bcarver | [JSON](https://arweave.net/ndr-KTmclrqLsox1TNvFzufJCsdR_1pLlxSpUXwpmv4) |
| NORARE.PEPE | BBLEIZTZ | [JSON](https://raw.githubusercontent.com/bbleiztz/jsons/refs/heads/main/NORARE.PEPE.json) |
| RAREJDVANCE | BBLEIZTZ | [JSON](https://raw.githubusercontent.com/bbleiztz/jsons/refs/heads/main/RAREVANCE.json) |

Held back: GLITCHPEN names PENPEN_404 in its JSON; PROWALLY names PEPECREATURE. Both need identity reconciliation. BIGDEAL.xcp describes a multi-artist card bundle sale, so its operator signature does not establish authorship of the included artwork.

### Hitomi Matsui and Kenneth B Moon: 2026-10-11

Their shared issuing address is not an authorship rule. The following individual sale listings explicitly credit the artist and link the exact token; corresponding CDN artwork was reviewed. Preserve the existing Kenneth B Moon spelling. Kenergy and Love Love Pepe receive their own documented collection homes.

| Asset | Artist | Evidence |
| --- | --- | --- |
| GUARDIANSATK | Kenneth B Moon | [Sale](https://scarce.city/sales/guardians-attack) |
| NEOHOMERPEPE | Kenneth B Moon | [Sale](https://scarce.city/sales/NEOHOMERPEPE) |
| DEFENDERS | Kenneth B Moon | [Sale](https://scarce.city/auctions/defenders-of-the-bitcoin-network) |
| BTCCITADELTU | Kenneth B Moon | [Sale](https://scarce.city/auctions/bitcoin-citadel) |
| BOBOAPRSAGIN | Kenneth B Moon | [Sale](https://scarce.city/auctions/bobo-appears-again) |
| PORTFLCITY | Kenneth B Moon | [Sale](https://scarce.city/auctions/floating-citadel) |
| LOVEDREAMY | Hitomi Matsui | [Sale](https://scarce.city/sales/lovedreamy-token-sale) |
| FULLLOVEPEPE | Hitomi Matsui | [Sale](https://scarce.city/sales/fulllovepepe-token-sale) |
| FRIENDSHAPPY | Hitomi Matsui | [Sale](https://scarce.city/sales/friends-happy-token) |
| HODLTIGHT | Hitomi Matsui | [Sale](https://scarce.city/sales/HODLTIGHT) |
| NEOMEGAMI | Hitomi Matsui | [Sale](https://scarce.city/auctions/statue-of-liberty-2) |
| BTCHMEAL | Hitomi Matsui | [Sale](https://scarce.city/auctions/bitcoin-lovers-happy-meal) |
| KENERGYOR | Hitomi Matsui | [Sale](https://scarce.city/auctions/kenergy-orange1) |
| KENERGYBS | Hitomi Matsui | [Sale](https://scarce.city/auctions/kenergy-orange1) |
| KENERGYBB | Hitomi Matsui | [Sale](https://scarce.city/auctions/kenergy-orange1) |
| TOKYOSILVER | Hitomi Matsui | [Sale](https://scarce.city/auctions/dress-up-pepe-fake-silver) |
| OSAKAGOLD | Hitomi Matsui | [Sale](https://scarce.city/auctions/dress-up-pepe-fake-gold) |

### Additional exact-asset metadata credits: 2026-10-11

Current chain descriptions still point to these original metadata records, whose asset identifiers match exactly. CDN previews were reviewed. The published `pgpsig` attribution text is not a cryptographically verified signature. Existing artist spellings are retained, and no collection acceptance is inferred from a generic directory link.

| Asset | Artist | Original metadata |
| --- | --- | --- |
| FANKYMONKEY | Boris Svirsky | [JSON](https://fankymonkey.com/assets/FANKYMONKEY.json) |
| RUBENPANG | Ruben Pang | [JSON](https://xcp.coindaddy.io/RUBENPANG.json) |
| GOGOKEK | GOGO FREN | [JSON](https://arweave.net/9Gk4KozptAtBrQHJb_B2zClgIc84uBEd7E-CROXqnz0) |
| PLASTICPEPE | Burn | [JSON](https://nm6t4ynx7enknmmzw5ysp2ihlrh57wgh6lezxv5n7rlot42hrlra.ar.io/az0-Ybf5GqaxmbdxJ-kHXE_f2MfyyZvXrfxW6fNHiuI?/PLASTICPEPE.json) |
| TILES | mellow | [JSON](https://xcp.coindaddy.io/TILES.json) |
| MARIHORSOE | Kat Rose | [JSON](https://assets.rarepigeons.com/meta/MARIHORSOE_1774448037.json) |
| SQUELCHSKIN | angelsintheai | [JSON](https://arweave.net/PMWkIwOYsVlR3BxRe7bFdH3nhXjwa9m21CV7l6S5Snc) |

FANKYMONKEY explicitly identifies Fanky Monkey as Boris Svirsky and labels the work as his digital art. RUBENPANG identifies the artist, title, date and dimensions of The Totalitarian Sun; these also match [the artist’s own artwork page](https://www.rubenpangstudio.com/the-totalitarian-sun). This credits the depicted painting without asserting token endorsement or physical ownership rights. SQUELCHSKIN identifies its creator and describes a software skin registry token; the credit does not make other skin assets members of a collection. Full audiovisual review is separate.

Held: BOOSTLEGGED names BOOTLEGGED in its JSON, OUGHTOPENPEN names OUGHTOPEN, and PLAGIARIZER currently displays an empty card template. These do not justify new attribution without further reconciliation.

### Signed artwork and exact-asset metadata review

Credits below use original current or historical exact-asset metadata and reviewed artwork. Published pgpsig text is attribution evidence, not cryptographic signature verification. Existing artist spellings are retained; no blanket issuer attribution is applied. LOOKSRARE stays in Kaleidoscope.

- **LOOKSRARE → M0d3d3b0**: Exact-asset metadata explicitly attributes M0d3D3b0 in its published pgpsig field. [Source](https://xcp.coindaddy.io/LOOKSRARE.json).
- **KINGDROOL → M0d3d3b0**: Exact-asset historical metadata explicitly attributes M0d3D3b0 in its published pgpsig field; the artwork matches the current card. [Source](https://xcp.coindaddy.io/KINGDROOL.json).
- **PEPEBEBE → M0d3d3b0**: The reviewed artwork has the MOD3D3B0 signature at lower left. [Source](https://cdn.xcp.io/img/card/PEPEBEBE).
- **SEANPEPE → m0nti**: Current exact-asset JSON explicitly attributes m0nti; an earlier metadata revision agrees. [Source](https://okexrgydbzvv3lxk4utabzc6icx7n5dqiparabtgrsggagmzfbyq.turbo-gateway.com/col4mwMOa12u6uUmAOReQK_29HBDwRAGZoyMYBmZKHE?/SEANPEPE.json).

## Further CTC issuer metadata: 2026-10-10

Recovered chain-linked Arweave JSON by removing obsolete filename suffixes. Exact asset identities and explicit pgpsig attribution support missing CTC and BLISSFULMORG credits, with Emperor Western credited for the artwork where the record distinguishes drawing from Cody typing text. TRUMPWINS credits CTC and Emperor Western separately. The project families are documented in DeterminPepe and QueenArtCoin; existing official primary homes are preserved.

Hold LFGLUTNICK and SPELLSOFGOAT identifier mismatches, ambiguous AMY DIGI CODY DOODLED, and BEACHBOBO: its metadata says BAM BAM while the current credit says Salva. No existing attribution is overwritten. LFG website branding alone is not acceptance into its directory.

## PEDALWARRIOR artist: 2026-10-10

Its [exact chain-linked JSON](https://arweave.net/AYu11tGi0LxJfPK1KBaHFbxYnqCQ7aRp8UfjFpMilRI) signs neilol and links @PepesAbstract. Add that explicit credit only. The wider issuer contains coherent Pepe portraits but their Easyasset JSON is empty and the referenced AbstractPepe website is offline; no collection membership or other authorship is inferred. This is unrelated to the later Abstract-chain project of a similar name.

## Robness and Waldemar metadata review

Exact chain-linked Arweave metadata identifies Robness for LANDWOLF and MADONNANPEPE, and Waldemar for XCPREVIVAL. MADONNANPEPE explicitly says it lives outside the Pepe collection system; it remains in the Counterparty fallback. Existing Robness and PEEPS collaboration credits for RARESTPASS and NEWPEPEDESU were confirmed and preserved. Other numeric artwork from the issuer remains unattributed where metadata is missing.

## DODO metadata credit

The exact chain-linked [DODO JSON](https://arweave.net/tTvK2Fu9Hs8HZ1DT-c_GKBkN1VMHR0ifinrvms6AlhM) signs “J-Dog & LongBranch” and links jdogresorg. J-Dog resolves to the existing JDog artist. LongBranch remains pending verification against the existing LongBranch Bear identity rather than creating a possible duplicate. DODO remains outside the Blackbox namespace.

## PandaGod and Arvik metadata review

SCARFACEAPE explicitly names PandaGod in its chain-linked Coindaddy description. Exact matching Arweave records signed Arvik support individual restored credits; mismatched STEAMPENSK/STEAMPENK and GLITCHPEN/PENPEN_404 records are held. No blanket issuer attribution is applied.

Matching Arvik source examples: [STEAMPENK](https://ollqtd7jckwahzlqu55wo6ku4mnfgx4bx6n3d4dubp7roskvci5a.arweave.net/ctcJj-kSrAPlcKd7Z3lU4xpTX4G_m7HwdAv_F0lVEjo), [PEPEARVIK](https://vb3jnn5vjqz3avr556efn433o7avmdjho33jre6cf4q5tcuarvla.arweave.net/qHaWt7VMM7BWPe-IVvN7d8FWDSd29piTwi8h2YqAjVY), [NAKASENDIT](https://zoq5p5pxjkv5nyjxffpliewxhoogy7xnnpqxiyjoldbqxusokata.arweave.net/y6HX9fdKq9bhNyletBLXO5xsfu1r4XRhLljDC9JOUCY). Each added credit was checked against its own exact JSON asset identifier and signature.

## Davesta and Kane Mayfield metadata

Individual chain-linked JSON signatures restore missing artist credits; no issuer-wide attribution is applied. Existing PEPENEAL collaboration credits and TIMELINEXCP role-specific credits remain intact. Cases with missing or mismatched JSON remain pending.

## BIGAPPLEPEPE artist

The [reviewed card preview](https://cdn.xcp.io/img/card/BIGAPPLEPEPE) visibly signs the work @shawnleary. This matches the existing Shawn Leary artist handle independently published in the official [WOJACKCHAMP metadata](https://thewojakway.com/j/WOJACKCHAMP.json). Credit this particular signed card; do not infer authorship for other works issued by the address.

## MANCHESTWOTR attribution

The [exact chain-linked metadata](https://f3ahbovsupish6su6w5gpsam65dnazwywkfhprwasvvinrjt2swa.arweave.net/LsBwurKj0SP6VPW6Z8gM90bQZtiyinfGwJVqhsUz1Kw) explicitly attributes MANCHESTWOTR to Indelible, matching the reviewed preview. This is a published attribution, not a claim of cryptographic verification.

## thewisekhan recovered metadata credits

Seven exact-asset Arweave transaction-root JSON documents identify Khan/khan and link https://twitter.com/thewisekhan. Use the existing thewisekhan artist, not a new Khan duplicate. These are published metadata attributions, not cryptographically verified signatures. Preserve all prior traits and memberships. No issuer-wide attribution extends to assets without matching evidence.

- KEYGENPEPE: [metadata](https://arweave.net/GCIWDDDckxoAwptvM_3Ym2aVONNSTE-6SHTBDmBEEww)
- RIBANURA: [metadata](https://arweave.net/ujzaM_YjZDw7NWnC9saKiM6SVhkoaGNO5SfzBX3D-pA)
- PEPETRENCHES: [metadata](https://arweave.net/pxYrDTBRDTrXoluMpFIci8M0ZVdT21RHfs1a8kL_K08)
- INCOGNITOKEK: [metadata](https://arweave.net/EjyXBy_qKlbVvmMaEAjttfGxXUrbIXKEyQ0vcJ7G3aA)
- GODIVAPEPE: [metadata](https://arweave.net/GveGQ3C6LMBSKPGByhLUGCWHg0HD5SXQtxcMnyNxonM)
- PEPECZAR: [metadata](https://arweave.net/iXRoyDyXVQAX1TABGiFwnfyTpeR0q-iSRb-D7-Flbqw)
- PEPEITA: [metadata](https://arweave.net/eUSeAiMLs-GftwKplPLdLpcW0XoeCn3lHBxKdfRUOas)

## BTC Monk and Ffmad documented credits

BTC Monk credits use exact token links from artist auction listings, plus the exact BITKNIGHT Coindaddy document. BITNIGHT is not credited from its mismatched BITKNIGHT metadata URL. Ffmad credits use exact current Arweave JSON naming ffmad. No issuer-wide attribution or new collection is inferred.

- BITKNIGHT — BTC Monk: [source](https://xcp.coindaddy.io/BITKNIGHT.json)
- PEPKNIGHT — BTC Monk: [source](https://scarce.city/auctions/PEPKNIGHT)
- BITCOINFACE — BTC Monk: [source](https://scarce.city/auctions/faces-of-bitcoin-artwork)
- SATOSHIDRAGO — BTC Monk: [source](https://scarce.city/auctions/satoshi-dragon)
- SATOSHITHROW — BTC Monk: [source](https://scarce.city/auctions/satoshi-throw-artwork-and-token)
- NINETYKBTC — Ffmad: [source](https://arweave.net/HKVApg1SgIJ3syfmttaVrGn7Vvgr1a0EaOGdzqsCBlI)
- PEPEFAIR.80K — Ffmad: [source](https://arweave.net/5grk1a9L7NGI25a9SCrvHJzz_N2PcmOmabEykF7WfZo)

## PEPEHEADRISK artist credit

[Exact current asset metadata](https://arweave.net/IJqJCIvnF1sxCEdcwfDLRVjk5WMHuWmgye31Xm1KXe4) names DANCETURN and links https://twitter.com/DanceTurn. Reuse the existing Danceturn artist; no attribution extends to other issuer works.

## LvsD recovered metadata credits

Three exact-asset Arweave transaction-root JSON documents identify LvsD and link https://twitter.com/Zbyku. No existing LvsD or Zbyku artist profile was found in the public artist search. Use the published artist name LvsD; Zbyku is the linked social handle. These are published metadata attributions, not cryptographically verified signatures. Preserve all prior traits and memberships. No issuer-wide attribution extends to assets without matching evidence.

- DONTEATART: [metadata](https://arweave.net/M1wbjLaXBDK0n64SfzK7PwxKI5mevjw-SxZ-YmjO-N8)
- FAIRSTORM: [metadata](https://arweave.net/5kEoTavtGL8OjrU5OmhpLUrhYBnwXHzwWaliq7kMdEY)
- DREAMCODE: [metadata](https://arweave.net/_L7riYdOhh9iO5U4k1zyeq5vmTR4cfZYSllEGdAFelU)

## Waldemar recovered metadata credits

Exact-asset Arweave documents credit Waldemar, WaL or WR and link the same Wrbpt26 social handle. The full Waldemar spelling in matching DIVINETLC, ENERGYWEAPON and MASTERINTEL metadata corroborates the aliases. Reuse the existing Waldemar artist profile. No issuer-wide attribution or suffix-only metadata matching is used; preserve prior traits and memberships.

- FEELME: [metadata](https://arweave.net/R2DdGVJGM-hq25SBYw5eHtKSCU0I4VpUxGPRQ7R7v_k)
- ROZE: [metadata](https://arweave.net/bNEymq2oSGmHQOUJiyOhtak444vs5j1ipSGcFscSQA0)
- WHITENOISE: [metadata](https://arweave.net/nhIVJkAmd_heXavnUr19C2R89HrF9zOYmoHf6lSuNb4)
- TLCBLOOM: [metadata](https://arweave.net/5F-GThSCeCh4_v18SQrLd-p9vET1jvRB-oqhJRwvnOc)
- TLCIGNITE: [metadata](https://arweave.net/d_PDDbvxab4MTMdkiol0jSujBBP4Qc-84IxSvduXy3o)
- TLCARTFARE: [metadata](https://arweave.net/4cGxPE3uep0vnuO9jAfjVqA7tg_8v2i0nhKIC2S-ahQ)
- THEREVIVAL: [metadata](https://arweave.net/gyFqSyPC32eZlLuwoRRiAZl0UNFHLSTtKD6TP_GeyMk)
- NUMBERSGAME: [metadata](https://arweave.net/W2np9erZZhodx86zhzGV2GlY_GyaS6T9STdSJ3fFIvg)
- CORETHIRTY: [metadata](https://arweave.net/PCa_S7yK-PXeAD2iCI_RA0zNNZxKO059oU-62UIYHJQ)
- WHATFILES: [metadata](https://arweave.net/XLcjMlTNlpGYC6j399D6b5OtEVF6d3Vntwiwt00T1fE)
- SKYROCK: [metadata](https://arweave.net/pC7zgHjJNKpBQ4YA07fJR8yYloP9Igiq64TjuLeQY5k)
- INFINITEECON: [metadata](https://arweave.net/f8VJdSvCIO3Ge8c9v6RkcpoqhHBWJxarvOvrDVoYNUI)
- BURNWUTIWANT: [metadata](https://arweave.net/twFA_JpWmJfSdt-2FgQcc2khokx1W2ZUYrUb6p8dj48)
- GAZAFAMINE: [metadata](https://arweave.net/hHBdntvzzj74PIT1n7qAm7mEf5qtxe-ZlIV-CzCfzX8)
- KEKKEIGENKAI: [metadata](https://arweave.net/qG9heRRvrJ0ZvJSkbdfzV8f5tbwKqlBufYmS6NcM6h4)
- DIVINETLC: [metadata](https://arweave.net/G3Bq69d6C5mXIaqyMr-JeyURG5ILZSr_BYs7ka3siE0)
- EMMAMARKIN: [metadata](https://arweave.net/poWJUhIkhuGHgbnNcrrlyv-Rv3CtqgdGtdx8tPxZApM)
- ENERGYWEAPON: [metadata](https://arweave.net/bLeQcRMX95_jqwCw82CLP3_N1a82XPa7X8u1bQ4MgVg)
- MASTERINTEL: [metadata](https://arweave.net/0aT6UMcH9kRjdmnJDohp6PZT62ZzmK3RNxVGJRQ2ToI)
- CHARAGMA: [metadata](https://arweave.net/d67QefiuZxpIU7kD_uPlbWwfvhKezzuvUHFnkIzFO_w)

## DARKBLUEPEPE artist credit

The [exact-asset historical Coindaddy metadata](https://xcp.coindaddy.io/DARKBLUEPEPE.json) names Zossel in its artist field and links twitter.com/Zosselk. Reuse the existing Zossel identity; this is not an issuer-wide attribution. Existing traits and membership are preserved.

## Exact metadata artist credits

These asset-specific metadata documents explicitly identify the artist. Existing memberships and other traits are preserved. For NATPRINTER and YOUNAT, descriptive text identifies Psyfrogger as the image creator and Subterranean as the minter; only the image creator receives an artist credit. No issuer-wide attribution is used.

- TOPFLOORPEPE.template: subterranean ([metadata](https://raw.githubusercontent.com/subterranean1/jsons/main/TOPFLOORPEPE.template.json))
- MISSINGPEPE: arwyn ([metadata](https://arweave.net/F7B7_OhDXJ8-NGJvSHvycmN0-4tDrPg78bjvSaYxOdA))

## Recovered exact metadata credits (2026-10-11)

These canonical Arweave metadata records match each asset exactly and name its creator in the Easyasset artist field (`pgpsig`). Credits are asset-specific; shared issuers and similar artwork do not establish attribution or official collection admission. Existing traits and membership remain intact. gg Toy Company is the consistently credited studio, also signed on the six artworks.

- BLUEBICQR: qrgraphics ([metadata](https://arweave.net/URlqJ2UV8Ejsd_-eZexxShr_L8HsRVYcDZTU1mqoPXc))
- DANKTRADE: HAMMAD ([metadata](https://arweave.net/dVQBp1S3RAPJH0F0MiIkXkbjZ4Q2WR_79RZyvg8XdYc))
- DIGITALDREAM: Mighty33 ([metadata](https://arweave.net/bjaRmErhG5cnDB95twL4MD9rw_bSIzpsrFXvnHm9jgQ))
- BETHEWATER: pepemanuel ([metadata](https://arweave.net/jpYwoqXtuP3mcr4iqYaxhHXgHG3tyXSO9XIZtxVew7U))
- PEPECANN: pepemanuel ([metadata](https://arweave.net/CmPDbOYe7hrwxVPYnTK1H2DsIxqetxoUAVMW0a_qzTQ))
- IMBACK: LINNET ([metadata](https://arweave.net/Q_keK4fLzfbR1ZP5NdzmlGhr0jxbyX1zuE3QvrTEXrY))
- POKERFACE: Fanelli ([metadata](https://arweave.net/Pnk84YBI1G-YYlnDq2FWAL0LoQpuHEXfNGcsizaShQE))
- BYGONETNT: gg Toy Company ([metadata](https://arweave.net/4Z_ujdZEMXk6m1-a8-WTT5ea7TPwJR9DE7O39YyE2FQ))
- DEADMOUSE: gg Toy Company ([metadata](https://arweave.net/FscT8tFVQ4Up2eTRl1SdnJD0DF_288UfKuqm5WdGSwA))
- DRINKIT: gg Toy Company ([metadata](https://arweave.net/S458s0BFMS9-5S-kCtd12JbtpMGprHK2wbgHOggTSYg))
- ORANGEPILLZ: gg Toy Company ([metadata](https://arweave.net/TIDmwV-DBGTvQJSIfhqpOyLIaYgum7zdZEC_xnB_QC8))
- PEPEAMI: gg Toy Company ([metadata](https://arweave.net/6VzexVYCCg2UwJ0bMh8aS_-xGu248LXdq4zNejCye-Q))
- TRUMPSFINGER: gg Toy Company ([metadata](https://arweave.net/jJY7T21tp3Tr-HciQRd7xLLnl8aVgcMLfazzDglCxZk))
- PEPEHUGE: vnmber ([metadata](https://arweave.net/JjilfSvcYsxYKpLZF0t8bl-4LDWgOVQeYfsYQMJtftQ))

## Recovered exact metadata credits (2026-10-11)

These canonical Arweave metadata records match each asset exactly and name its creator in the Easyasset artist field (`pgpsig`). Credits are asset-specific; shared issuers and similar artwork do not establish attribution or official collection admission. Existing traits and membership remain intact. FEELDANCE identifies Nimzobit as the visual artist and separately credits licensed music to Adrian Key. The existing ditacrypto spelling is reused.

- SOLARBOBO: Austin Hambelton ([metadata](https://arweave.net/SEe3ypEpyz9yhZlOFISUD2YbXdOjIcdgOD4w3ahn1FE))
- SOLARDANK: Austin Hambelton ([metadata](https://arweave.net/aN6fQ9soBX5xwmC2YDWLjtIt10hUQsAhkIKl21wC0wM))
- SOLARPARADE: Austin Hambelton ([metadata](https://arweave.net/ejSlNGRunM1tthCVBizE_B-k4bGqCTPz9_-TBhdnkR8))
- SOLARPEPE: Austin Hambelton ([metadata](https://arweave.net/_XsMPVIu903ylrUomVGNml3IcZp8pN8vH429S4Vg3Dw))
- DEVILINSIDE: Tim Mielke ([metadata](https://arweave.net/tBvWF-yu6QM1Zw-ZrpWS3Oesz0SX1LI1tYcy29eVXY4))
- HEAVYMETALOV: Tim Mielke ([metadata](https://arweave.net/BQEZiceiBjDc2pWTcCdpDWBUXg2awgApsGo3ePN3TKo))
- SPACETRUCKIN: Tim Mielke ([metadata](https://arweave.net/yhoIt2BVWYLAelN_r6eyXC9K-vw1CQ2QNSljDHuIH8M))
- TENNWHISKEY: Tim Mielke ([metadata](https://arweave.net/VCYe2fAHg0DGe7YJP_ucesY8YjXz5DqGRPcSxp0HuyE))
- COWSPEPE: DarkFluffyRabbit ([metadata](https://arweave.net/CAxBR5pr2zCA7fcoGT03z3astLdxziYEANMnw5M0qW0))
- HOLYDENSITY: DarkFluffyRabbit ([metadata](https://arweave.net/Yxpvfu3ICTkn5wLua9-_w98cXPwTpIqkLRILSI4PhZE))
- PEPEMORY: DarkFluffyRabbit ([metadata](https://arweave.net/twCMYLlSXsV1DVyzkm47v_RBAgW4F7QfHMQHwAjZVJY))
- PEPEBBOY: DaoHackerman ([metadata](https://arweave.net/-L1QHVIFFiutoCx2EGoGNmupqFkXDyJp5T-_OJPtASI))
- IDREAMOFAKES: ditacrypto ([metadata](https://arweave.net/lEiWWHwVpR_0OHevnOK2exxEqzV-UhNglxlDIJvbsYk))
- NIMZOBIT.XCP: Nimzobit ([metadata](https://arweave.net/O-KQ6f1ZtRHHRfbydEm4RzOv5KzI_VYTvz_ITe3_Pvs))
- FEELDANCE: Nimzobit ([metadata](https://arweave.net/aINfwBjWjuISybgAeyf3Geznr_xRqw5BlqJtl9994QQ))
- SPONSORPEPE: Nimzobit ([metadata](https://arweave.net/NtalynE5DgxzNuubPanXsuEg7WZtDymX_ku2lBgifs0))

## Exact metadata credits, reviewed 2026-10-11

The following asset-specific records identify creators, rather than inferring them from issuer addresses. The Easyasset `pgpsig` artist label is checked against the description and existing identities. Owner-only labels, unresolved collaborations and ambiguous aliases are held back. Ctc and ffmad reuse CTC and Ffmad. DARKRITUAL explicitly credits PurpLeTariat for audio composition; its named AI tools do not become artist profiles. PEPEANGELIC explicitly credits BTC_Socks. The two Pepenardo works contain creation statements, including his Xnardo alias. These credits do not establish admission to any official card collection.

- BITKING: Stroxpix ([metadata](https://arweave.net/EbAXQlGgzw6drkzMLBYSqp9lw-bdsquXgnDVg-s_564))
- BITMONALISA: Stroxpix ([metadata](https://arweave.net/NGgY_NXMvMmG9I1HSlxeOHAt0epiK-XPeNMB5kIh-5I))
- BOTTOMSIGNAL: PurpLeTariat ([metadata](https://arweave.net/ivfBdOQBFO2SKMq4Vk9EVhVtsHDmxsLrLSN9lTrWpJA))
- DARKRITUAL: PurpLeTariat ([metadata](https://arweave.net/CPbTE-kPeFqDfZ-bhSRfxsKFcjosA-FLdTODmxJHEhM))
- SMOLDENZA: HTX_m0nster ([metadata](https://arweave.net/isjw0qT51X6c9Wo8JMqWAZNutNdCLDHt5mv5W8k5v4Y))
- DYSPHUNCT: reinamora ([metadata](https://arweave.net/czHIaMVfn-zybEF03zTq78ocs-s1cyhkf8Qt6khwuzw))
- MARBLEQUARRY: reinamora ([metadata](https://arweave.net/kquANvyZM7GSXFKMr1_xb4Abrdi0lyB5WQ0i6nGJLW4))
- LFGYODA: CTC ([metadata](https://arweave.net/EGIsdaQqBMXq2Ap4P4SDfZLKQtmdimQb-C7iANYEN_Q))
- MISSGREENLND: CTC ([metadata](https://arweave.net/JsiKQlpY-eZojWsskIxVaSShuwgL8izQQC4QBj4ea8k))
- MISSMIM: CTC ([metadata](https://arweave.net/pSjHrQTResIJTPqYdzYhi0jdX15gWSgpXKJNKlsokUw))
- FAKEKESTRARE: THE PERFESSER ([metadata](https://arweave.net/yZrHYmDotDvOYTEI3Lqaf2mlG8-7Cbpw_KKCzqIxMmk))
- CANTREACH: Ffmad ([metadata](https://arweave.net/YT_dl0isEmP7xlNj2azfADlFFXNtLTS9T2HyKyicmpw))
- FAIRMINTER: Ffmad ([metadata](https://arweave.net/4zOjaK4D7j5UnaaOb2YmMA6pOcv6Yp9rmIzaSL94NcQ))
- PEPEANGELIC: BTC_Socks ([metadata](https://arweave.net/AjVKFW3ih3KcXU_YsrwGHaB_HFktHHAX6gOAPT06fZY))
- LASTMSG: LvsD ([metadata](https://arweave.net/j58beDhAEQOfx-mb0L4j7JmZTbLr4YfSvALGm5wLNtg))
- FKPEPEURINAL: Pepenardo ([metadata](https://xcp.coindaddy.io/FKPEPEURINAL.json))
- MADEREADY: Pepenardo ([metadata](https://xcp.coindaddy.io/MADEREADY.json))

## Exact creator metadata, batch 398–497 (2026-10-11)

Each listed record matches the exact asset and names its creator in the Easyasset artist field. Existing psyfrogger, Remster, ICQPEPE and Davesta identities are reused. Document authorship, owner-only labels and mismatched test metadata are held separately. TESTINGFW is credited as a test artwork without assigning it to an official card collection. RASTAPEPE.TRIPPY moves to its namespace collection with the supported credit.

- KEKTRIX: psyfrogger ([metadata](https://arweave.net/J-AHK_l4DpeIVML-nblOHdIx0E-vZZwPyhS0q7cViHM))
- KEKURAI: psyfrogger ([metadata](https://arweave.net/6R3bO8njGnRG7ysGbKibuUrRmdqr8hsR2ukig073Y04))
- LORDOFGOATS: Remster ([metadata](https://arweave.net/7mUTxj_6e0HpPBgiL5hm3ypabUdb03589g3ksAGRty0))
- MAGPALAYA: Remster ([metadata](https://arweave.net/Jjhn6V9BLGRlz23Uq7BSNAOTQErMIQ7TxGLKKs5JvVQ))
- PEPENAINTEZ: Chuy ([metadata](https://arweave.net/6-HebJv64rTrbxkzs75b9D2A7i5C9MwGHKGAwfWwYpU))
- KEKEKTEOTL: FtrSaroth ([metadata](https://arweave.net/D3JOP7xxLxAYufcRQuP5q_TZr2w9D5toFVYkIS2AH8w))
- MANDANKELA: Sofitzticated ([metadata](https://arweave.net/buFWC9skgxprSsYmYas4__AFraynnRZ6cypYUMqGKfw))
- MPPS: Sofitzticated ([metadata](https://arweave.net/dNeYx4gsbXeMP_K4p4_z9r8rfcgYDawcSkiIAIzsnJk))
- RASTAPEPE.TRIPPY: ICQPEPE ([metadata](https://arweave.net/FK9WvJCU1kgghILPt2mSm7qtOgQ1tTIyL3RAQOggXXg))
- TESTINGFW: Davesta ([metadata](https://arweave.net/8BLsgZUpYEhUXyRyQ1F5-xKfPmBW_1OjOBQjXgGqfaA))
- KEKOHOLDER: psyfrogger ([metadata](https://arweave.net/BYwQb3Bn5MLAt0puLOctz5XYfIWJs7yvdPSVqkg5kZ4))
- KEKOOKING: psyfrogger ([metadata](https://arweave.net/9Wg3dSC9jSgYYesXaOLZQ3-D4jbfj9yO7iVJ1mhdBTM))

## Exact creator metadata, batch 498–597 (2026-10-11)

These records match the exact asset. Four name the creator in the artist field; TRUDEEPEPE explicitly says "by trudeeart" both in its metadata and reviewed artwork. LvsD reuses the existing identity. Owner-only labels, project names, quoted-message authors and ambiguous aliases remain unresolved. No collection acceptance is inferred.

- SALTNPEPER: ih0dl ([metadata](https://arweave.net/KDOtLvTT96mxXZroHLUHwTYEmS4UqzsBRjNHhE5umSs))
- PECTERIA.MMXXIII: LvsD ([metadata](https://arweave.net/xF4oOv_KQ8EeLDZ03ySuC6eTTjKn-Il8e1FH8cOBlJ4))
- SIXSEVEN: GNART ([metadata](https://arweave.net/7o9_RK_2x4sdKeMl_zTUAVVJkQytWL7WBFZy9uOxpY4))
- EIGHTFOLD: Rob Mitchell ([metadata](https://arweave.net/MT4VHVUplQ1YmaxT_AYS0PKJkjkYxSynuUuxqoRVQZU))
- TRUDEEPEPE: trudeeart ([metadata](https://gateway.pinata.cloud/ipfs/bafkreidngrfqxacrcfe7n64fejiyk7lpo27k3oitr545vvuz5y3srobxri))

## Remaining issuer queue: exact creator credits (2026-10-11)

Each source matches the exact asset and identifies its creator in the artist field; all artworks were visually reviewed. Existing i3inary, Indelible, Nimzobit, LOVEBEING, Kat Rose, m0nti, DjLiberty1, Y8R4, GOGO FREN and kr identities are reused. Dj_Liberty1 is a punctuation variant of DjLiberty1. No collection membership is inferred from resemblance. Owner-only labels, cryptographic signatures, dates, project/utility labels and collaboration roles remain held for further evidence.

- SWANCHEKMATE.ALPHA: i3inary ([metadata](https://arweave.net/Ylnu4UzQimZue_ret95WLscCjGFWGJQl0A4v2TcXoRU))
- NAKAHONEYPOT.HOLO: Indelible ([metadata](https://arweave.net/uCuajITiXXCMpyscQ-tuwHkMDpLZiNBpLixqxz4oqTg))
- POWEROFMEME: mickross ([metadata](https://arweave.net/Yz3lvrsMEo9kBD1kywvUTbexPun2JfMYZXxz-3AjLK0))
- BUMBUMCHECK: Nimzobit ([metadata](https://arweave.net/d0bC3GGhUqI65tUu9QroUHkyU290ScJEKB9LjKUk5tg))
- KETKET: LOVEBEING ([metadata](https://arweave.net/y2TpGlfrlGIhBl16d56-Iqff81Azhdnm2Lk-tsr2KXE))
- PEPECHUU: 8BitMo ([metadata](https://arweave.net/iNw2K2TKZninmBkgQPxP2ew-L7ft1bBxvzzaL2uVLFg))
- FAKEJACKBFL: BadFoxLab ([metadata](https://arweave.net/ssBXYP9yQO0svEPveWGvfXh_PFEE4POkjfq_xl1mIh0))
- ORIGINALG: Equilibrium ([metadata](https://arweave.net/xcD8T6zjcYKCPuFJnt92JCEHO_lHJf-ouZruiEFnJX0))
- A12460021579324678296: Nimzobit ([metadata](https://arweave.net/HSd5WewwpyhOrDsbxnBh7o0j82U0M4MC_e35KM510YE))
- PEPEMIRAGE: leo.o ([metadata](https://arweave.net/lDQePQca--9MO5r1vXpUZbS0K7WMWHptl9x8-lWrB9I))
- PEPTRON: LOVEBEING ([metadata](https://arweave.net/bw18HFK2n437ok41Z7fzPmWCUi1Y-8E7P6iOCV3VMX0))
- ETERNALGRIN: Orb ([metadata](https://arweave.net/wHRmyDmIbG0O47Dif4piIPS3BZAhsIzeIMbrigVprZw))
- FAKECRUSH: Key1Art ([metadata](https://arweave.net/rGxiZWTEk87kI_iRkhG7Hk2zOe76iGcrIb3IfsoQURM))
- UTERPEPE: m0nti ([metadata](https://arweave.net/M9RG_FiVveSvKCwNK5MVM1na4FE4708C2FLSHJp8T5c))
- VIOLINI: DjLiberty1 ([metadata](https://arweave.net/Rzw_m_z43U0r_RRdwGJixqM8ZdEViFAQHqUlGKqvANY))
- TOTERPEPE: jivinci ([metadata](https://arweave.net/5x4Lr8y0mrQ1GSG0Da0pqb6aw7cm7xeNhpJ68jBRfp8))
- MUNDIKEK: SatoshiDavinci ([metadata](https://arweave.net/PsWu1v-iLP06jND-kFGI3h6A0UyH6Llm7ViKUJ-gG9k))
- LONGLIVEKING: Alexander Mazzei ([metadata](https://arweave.net/5KiuT8nMt_aGqCjm0Fdn-rHV07ItzIYdvxR7rcjV8X0))
- GEDULD: LordAntHreX ([metadata](https://arweave.net/1mGnkJbxQwoW92Xo2S2xXdAG_WkYs0z_69Wm4GVCLOg))
- COCOSUPPORT: Y8R4 ([metadata](https://arweave.net/NZW2XdFS7XGIl-PUD-z8q2p4V-OqJfp0-0szL_mt6CE))
- COCOMONDRIAN: Chipi ([metadata](https://arweave.net/a9t-2_MCq2s-TTcpkcRlmf6J_WrIxGDw_OyZVvuXiVI))
- LELOUVRE: KEKIAVELLI ([metadata](https://arweave.net/4KzpzKtzntKqNB52-BZiar6dkYJ3ogLbcJNJXv7dOU8))
- EAZYOH: kr ([metadata](https://arweave.net/0VUFN4_MNfkl1yC9FhK6jXiweYcQUiUbO1pliZfqm68))
- PEPELOSS: tap ([metadata](https://arweave.net/QJTdK1pV_zzsCv8h7l2bH94c560pvqY6OYF_ZYTNtvA))
- PEPEWAZHERE: Iryna ([metadata](https://arweave.net/JJVT4ivY6IId1f_HOwUHLs0DYB1SRVnoLDKL4NeQ4Bo))

## Recovered creator credits (2026-10-12)

Canonical Arweave transaction roots name the exact assets and creators below. PRAETORPEPE also describes Oscar’s first Pepe and is signed Oscar D in the artwork. Credits do not establish admission to any other collection. Mismatched asset identifiers and ambiguous LBB/LPLBB/Dan King aliases are excluded.

- PURPLEJANET: DanDarkPill ([metadata](https://arweave.net/UqZiuyLO8UKI5jbWOgBvce9i4nSw_wXowbtgAAJSUnU))
- THEPEPEWAR: DanDarkPill ([metadata](https://arweave.net/rt3xAQtaW0mvhOTrHi0n6ZhWcs4MVV8HO035o57SGAo))
- THESLEEPERS: DanDarkPill ([metadata](https://arweave.net/kM3mahYhPLfRpcIwIrL87EyFLe6qFyKuCi5rNZlEQds))
- PEPEAIRSHOW: DanDarkPill ([metadata](https://arweave.net/sG8xaIiX7NtbSZwGM0-OlfM4sj42-tZo0u0YV3R7Esk))
- UTXOENJOYOOR: Viva La Vandal ([metadata](https://arweave.net/GsOYLO16Fq5-sLp8YaiW_no-mOHVFeyY2YNmVlSRkHk))
- REKTOSHI: Viva La Vandal ([metadata](https://arweave.net/jewp4mr2wrLEne9TKR5D6UnD4Zs4didNReP4JwkfTfE))
- SNITCHINSAM: Viva La Vandal ([metadata](https://arweave.net/EFjZNDY0rhNx6guPVDUJHBHkoGOSQUQn93x7f58D0dk))
- GETEMGARY: Viva La Vandal ([metadata](https://arweave.net/AGGCMWjVhS3OrLG5g3AbBc8XwJnnDCGHHky1x5lGdBY))
- IMSOBACK: Viva La Vandal ([metadata](https://arweave.net/9Su5p4LTPFCK6HKXAsGUik0r812Yv-Y2sup52LI5bxc))
- EXPERTPEPE: Viva La Vandal ([metadata](https://arweave.net/3G-PbVCGQNSnW5ihT-4hnUDaprnks9hn8dOoj_VvnB0))
- TAGAMOTO: Viva La Vandal ([metadata](https://arweave.net/clA6Ie9QMXhAz7jUHJ07rrma1jZ-85uhM07l0UJ4g6k))
- GIGACREATOR: Viva La Vandal ([metadata](https://arweave.net/BE_3UnoCa-vPa9bGxhP3sXant_aIXfIN1IIieRp9dA8))
- FIATFIGHTER: Viva La Vandal ([metadata](https://arweave.net/8E2ikvz_jbUBxhCLyURLT_FsDW17w_KVYKqa7tEI7xo))
- FAKEINSPACE: Viva La Vandal ([metadata](https://arweave.net/s3ZtjCK2IWJ_Pt28opyVw3jUPscCsMlfsA_bkltrUKA))
- READYTOBUY: Viva La Vandal ([metadata](https://arweave.net/SdCr_HZzMFxqDn8LuQiwxv6pdwzMm01aSOAg-Ro4430))
- SHITCOINMAXI: Viva La Vandal ([metadata](https://arweave.net/dM8Qhh1VbIUqe0dT7f_iLUSPASK5o2ZM9yR17B6p_Lo))
- THEBAKEDSONS: Viva La Vandal ([metadata](https://arweave.net/PkD7LU6nocwCvHQGXUt7Ni6fK9s3YRe-xfcxYXNZR98))
- FUTURISMPEPE: Viva La Vandal ([metadata](https://arweave.net/hF_cqMBgwSCilFhPgDCTiwHhEDuyjR5SiCSljMdS-Rs))
- HOMEBOYSATO: Viva La Vandal ([metadata](https://arweave.net/460TVxIwRpDe4zDU2qytKfc8-jJadwBkXW0UyC2VScc))
- PRAETORPEPE: Oscar D ([metadata](https://arweave.net/EPw2T45VOewhWBixzXdbGzDtkvLRoczsTILGdcOYN6E))
- NOMOARPUNKS: Viva La Vandal ([metadata](https://arweave.net/2R7ym655hkIsVGQMTLEBEDVVPKjJPmrQMYHk24gb31c))
- STAMPVANDAL: Viva La Vandal ([metadata](https://arweave.net/UqRYYD_0ZMJcr6FerjGEdpFUa3iYvn-CNTNm4Bh6sKk))
- SNOOPFROGGY: Viva La Vandal ([metadata](https://arweave.net/97ABNhWEAFxoE7C1vlgtG6YY1dbbLbUMKMrjQahaO-s))

Reviewed individual artist credits from exact-asset original metadata:

- TRUMPISFINE: **Pav**, from the [original metadata](https://arweave.net/6bLiPnfeoyKZ5p-WpN_7t8nCcxs_FAdIQ3h4Mw78bu4) attribution field ("Pav₿").

These are published creator attributions, not cryptographic signature verification. Existing collection membership and other traits are retained.

QTARDED is included as a standalone artwork. Its issuance history records 170 units and links the [original metadata](https://arweave.net/FA5T_1KvX8hBe2GUHG6mmv0lqHH4Ew0CLRSKNdMfqP0), which exactly identifies QTARDED and publishes the Sanzman attribution. The currently served CDN artwork was inspected and matches its title and description. The later on-chain description is COVFEFE; no new official collection membership is inferred from the card template.

Seven more credits come from the Easyasset artist field (`pgpsig`) in exact-asset original metadata. Each record identifies its asset exactly, and each served artwork was reviewed. Published attribution text is not a cryptographic signature; collection membership is unchanged.

- DEEPVALUE: **Lambie**, from the [original metadata](https://arweave.net/ssMqaraHi2cuWgZHo3klQMrS7bR6wwp8NZ3An2ZIWDw) ("Lambie 🍌 X Roaring Auctions", linking twitter.com/LambieArtist). Roaring Auctions is the auction house the card depicts, not a second artist.
- PENPENTAGON: **Jabkman**, from the [original metadata](https://arweave.net/-S4OW_z6pdMkT9GBH7oljTMsv6WVXa6gK1beW3cR9nE) ("Jabkman - JACK FROST Of The RarePenPen Agency"). RarePenPen membership still needs a catalog source.
- SOUNDTEST: **UNSOUND**, named as both artist and owner in the [original metadata](https://arweave.net/3ounLWooksGVn5WTQe3RcpuJBc3yR-G_I_JU_8GE-Dg).
- FAIRPOOL: **FAIRBOSS**, from the [original metadata](https://arweave.net/hGFMGvsIDBhsi7JLsyRUJ2oDTUbv-b-jei6DdyLkPo4).
- FUTURX.GREAT: **Too Ashamed**, from the [original metadata](https://arweave.net/XbCi577TyEtsj2gQdtr0sndgQwDIg3zXfmY9CT25eFE).
- ZEROTAX: **ROGUEPEPE**, from the [original metadata](https://arweave.net/KpJd6hIxr0oJIdvNs9qoniL3XlAs2aR4GYApWTgNBJc).
- PEPEANADOL: **falseflagcollective**, from the [original metadata](https://arweave.net/xPbksKU8MIcdOMXyPsQTcZym8uMpPSumxm2aUeuU_Ik).

Held from the same review: labels naming the depicted subject or character (BABYNAKA, DJDANI, WANGXIANG), a project rather than a person (PARTYPUNKS.0, PLAGUEHEARTH), first names or initials too thin for a profile (BIIITCOOOIN, PARTICIPATED), a book author on a redemption token (FROGMINSTER), a colour alteration of another work (QUEENARTCOIN.NAKAMOTOAPE), a thesis edition whose metadata names a different asset (ROLLANDTHESE.edition_soutenance), BUNJEEJUMPEP's "Maxwell" (linking twitter.com/maxkarlan, distinct from Maxwell Bruno), and CARNIATH's "Mr P x Stack", whose Stack is not yet tied to the existing Stack profile. CARNIATH's "FAUX SOGS" category is not FAUX SOGS admission: it is absent from that collection's official catalog.

UNNAMEABLE: **DanDarkPill**, named as owner in its [exact-asset metadata](https://arweave.net/jdR_dR__GCDrRZfX7KdP4bfeTC-hp9VyVlIhAaxD7bQ) (a multipart envelope; the filename path 404s).

## Curator-confirmed issuer credits (2026-10-13)

251 works are credited to the artist who accounts for at least 90% (and at least three) of the credited works from the same issuing address. Their own metadata carries no signature; the marketplace curator confirmed these attributions. Spelling variants resolve to the canonical artist (LvsD is L_vs_D).

Reviewed HOMERPEPE remixes retain their specific visual derivation; see the [HOMERPEPE comparison report](../../docs/name-based-derivative-review-2026-10-15-original-group-batch-19.json). Shared Simpsons subject alone does not establish a link.

PEPEMRBURNS retains its reviewed HOMERPEPE derivation: matching cloud background and card composition, with a Mr Burns substitution. See the [enlarged comparison](../../docs/name-based-derivative-review-2026-10-15-mrburns-followup.json).
