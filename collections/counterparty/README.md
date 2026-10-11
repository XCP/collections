# Counterparty

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 7,694 assets |
| Primary memberships | 7,694 |
| Secondary or curated memberships | 0 |
| Source | Reviewed static `assets.json` |
| Traits | Art year: 17/7,694 (0.2%)<br>Artist: 3,213/7,694 (41.8%) |
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
