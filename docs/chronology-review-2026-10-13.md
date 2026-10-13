# Chronology review, 2026-10-13

This pass individually reviews all 84 distinct assets (87 membership rows) in the existing art-year audit, and screens all 185 collections with an explicit founded year after PR 418. Collection screening uses up to three returned members per collection; it is not an exhaustive member audit or independent verification of every launch date. PUPS/KOKO family histories were separately reviewed in PR 418.

## Evidence rules

Registration dates are chain facts, not project or artwork dates. A later JSON pointer can be a repair, migration or first attachment of older art. Current mutable JSON does not prove what the same URL contained years ago. Positive supply, locking, ownership changes and distribution can corroborate a release, but none alone proves it. Sends and order/dispenser activity are not necessarily sales, nor proof that art already existed. Ignore invalid issuance attempts. Keep artist identity and collection membership unchanged in a date review.

“Keep” below means the stated corroboration supports the existing editorial year, not a claim that no older off-chain version exists. “Remove” withdraws an unsupported art-year assertion without asserting the registration year as art year. Ordinary asset issuance dates remain unchanged.

## Corrections

- **monster-book: 2023.** The tokens reserved in December 2022 acquired artwork in 2023. On July 11, 2023, project participant kamn8r announced the launch for the following week and a FOUNDERCARD giveaway. This supports the project launch year, rather than token registration. [Source](https://j-dog.net/archive/OfficialCounterpartyChat/2023-07.html).
- **pepe-flyers: 2023.** The blank parent reservation is from October 2022. The V1 edition issuance and parent supply expansion are in January 2023; the primary V1 editions 1–21 auction ran January 31–February 2, 2023. [Source](https://scarce.city/auctions/pepe-flyers-v1-editions-1-21).
- **phockheads: 2021.** The illustrated PHOCKHEADS parent and PHOCKHEADS.1 edition were issued together on December 31, 2021 (UTC). The child already points to its numbered image at creation and receives its edition supply the same day. This is coordinated project use, not a blank reservation. [Source](https://api.xcp.io/v2/assets/PHOCKHEADS/issuances?limit=100).
- **phunchkins: 2022.** PEPEDOM was blank when registered in December 2021; its image and lock are January 17, 2022. The named Series 1 premiere pack auction was February 15–17, 2022. Other sampled members were illustrated in 2022. The 2021 registration does not date the Phunchkins release. [Source](https://scarce.city/auctions/PHUNCHKINS-S1).
- **BOOUUSEGG: 2015, not 2022.** [EverdreamSoft’s account](https://medium.com/everdreamsoft/boouusegg-the-mysterious-token-cbc369f89edb) documents the illustrated card in Moonga in 2015. This dates the parent work, not the later WONDERFUL child. Artist-role attribution remains a separate unresolved question.
- **PUREPEYE: 2019, not 2021.** The [2019 description](https://api.xcp.io/v2/assets/PUREPEYE/issuances?limit=100) describes the specific physical coin depicted today. The later photo attachment does not date the coin.

## Individual art-year decisions

| Asset | Previous year | Decision | Evidence and limits |
| --- | --- | --- | --- |
| [CORNFUTURES](https://api.xcp.io/v2/assets/CORNFUTURES/issuances?limit=100) | 2021 | Keep | 2021 media, supply lock and first send corroborate the art release; original 2018 description describes futures contracts. |
| [HARVESTMOON](https://api.xcp.io/v2/assets/HARVESTMOON/issuances?limit=100) | 2021 | Keep | 2021 media and first distribution corroborate later use of the reserved 2019 token. |
| [CORNSEC](https://api.xcp.io/v2/assets/CORNSEC/issuances?limit=100) | 2022 | Keep | 2022 first send and metadata agree with the creator repository's January 2022 JSON commit. |
| [CROPCIRCLES](https://api.xcp.io/v2/assets/CROPCIRCLES/issuances?limit=100) | 2022 | Keep | 2022 media and first distribution corroborate later art use. |
| [CORNDOBE](https://api.xcp.io/v2/assets/CORNDOBE/issuances?limit=100) | 2022 | Keep | 2022 media and first distribution corroborate later art use. |
| [BOOUUSEGG](https://api.xcp.io/v2/assets/BOOUUSEGG/issuances?limit=100) | 2022 | Correct to 2015 | EverdreamSoft explicitly documents the illustrated Moonga card being integrated in 2015; the later JSON is not its debut. |
| [CHAINWARS](https://api.xcp.io/v2/assets/CHAINWARS/issuances?limit=100) | 2018 | Remove | 2018 mutable metadata pointer precedes 2021 distribution and 2022 illustrated children; the historic JSON is unavailable. No dated original image establishes the current parent artwork in 2018. |
| [CORNTOSHI](https://api.xcp.io/v2/assets/CORNTOSHI/issuances?limit=100) | 2023 | Keep | 2023 metadata describes the Bitcorn epilogue; additional supply, lock and distribution coincide. |
| [TEST](https://api.xcp.io/v2/assets/TEST/issuances?limit=100) | 2021 | Remove | 2014 activity predates the 2021 image, but neither dates the current artwork. A token test and a later collector image must not be conflated. |
| [BEERS](https://api.xcp.io/v2/assets/BEERS/issuances?limit=100) | 2021 | Remove | Earlier redeemable-token use predates the 2021 graphic; a later image and lock do not establish the underlying work's date. |
| [WHOSTHATDANK](https://api.xcp.io/v2/assets/WHOSTHATDANK/issuances?limit=100) | 2024 | Keep | 2024 image, additional supply, lock and first distribution coincide. |
| [DANKCHEMIST](https://api.xcp.io/v2/assets/DANKCHEMIST/issuances?limit=100) | 2025 | Keep | 2025 image and lock on January 4 coincide with first distribution. |
| [PEPEPANKTSR](https://api.xcp.io/v2/assets/PEPEPANKTSR/issuances?limit=100) | 2021 | Remove | 2017 description already names the joker Pepe meme; a 2021 image attachment alone cannot date that art. |
| [CUBEMOTO](https://api.xcp.io/v2/assets/CUBEMOTO/issuances?limit=100) | 2026 | Keep | Zero-supply 2024 reservation becomes an illustrated 25-edition locked asset in April 2026, with distribution. |
| [MOONCORN](https://api.xcp.io/v2/assets/MOONCORN/issuances?limit=100) | 2021 | Keep | 2021 artwork, supply lock and first distribution replace the earlier corn-farming description. |
| [FREEDOMFIGHT](https://api.xcp.io/v2/assets/FREEDOMFIGHT/issuances?limit=100) | 2021 | Keep | 2021 ownership change, first distribution and image support later use of a previously blank token. |
| [FAKEMPTHREE](https://api.xcp.io/v2/assets/FAKEMPTHREE/issuances?limit=100) | 2023 | Keep | 2023 media and lock follow the blank 2021 reservation, with first distribution in December 2023. |
| [CHAOTICPEPE](https://api.xcp.io/v2/assets/CHAOTICPEPE/issuances?limit=100) | 2024 | Remove | 2024 JSON pointer alone; the same pointer is used by CHAOTICART, without independently dated artwork. |
| [CHAOTICART](https://api.xcp.io/v2/assets/CHAOTICART/issuances?limit=100) | 2024 | Remove | 2024 JSON pointer alone; shared pointer with CHAOTICPEPE does not independently establish either artwork's debut. |
| [DRIFTING](https://api.xcp.io/v2/assets/DRIFTING/issuances?limit=100) | 2025 | Keep | 2025 additional edition supply, image, lock and first distribution coincide. |
| [DAWG](https://api.xcp.io/v2/assets/DAWG/issuances?limit=100) | 2024 | Keep | 2024 ownership change, image, lock and first distribution corroborate later art use. |
| [PEPEDELUXE](https://api.xcp.io/v2/assets/PEPEDELUXE/issuances?limit=100) | 2024 | Remove | Only a 2024 metadata addition to a 2022 token supports the override; no independently dated release found. |
| [PEPEFENGSHUI](https://api.xcp.io/v2/assets/PEPEFENGSHUI/issuances?limit=100) | 2023 | Remove | 2017 named subject and locked supply precede later transfers and 2023 metadata. JSON has no artwork date. |
| [PEPESPOISON](https://api.xcp.io/v2/assets/PEPESPOISON/issuances?limit=100) | 2023 | Remove | Locked 2017 token receives media in 2023; recovered metadata identifies the work but does not date its creation or release. |
| [PEPECASHGRL](https://api.xcp.io/v2/assets/PEPECASHGRL/issuances?limit=100) | 2023 | Remove | 2018 description already identifies the depicted subject; 2023 IPFS attachment is not sufficient release evidence. |
| [KALEIDOSCOPE.mindividualMindMeld](https://api.xcp.io/v2/assets/A9319607768878871249/issuances?limit=100) | 2021 | Keep | 2021 ownership change, lock, media and distribution coincide after a blank reservation. |
| [COLORPAPER](https://api.xcp.io/v2/assets/COLORPAPER/issuances?limit=100) | 2022 | Remove | 2019 website, edition expansion, lock and sends were missed by URL heuristics. No archived image establishes whether the current work is 2019 or 2022. |
| [TETSUWOJAK](https://api.xcp.io/v2/assets/TETSUWOJAK/issuances?limit=100) | 2026 | Remove | 2022 transfer activity predates the 2026 media and edition expansion; no replacement year asserted pending comparison with the earlier work. |
| [PEPESTRY.TAPESTRY](https://api.xcp.io/v2/assets/A7343329622276209289/issuances?limit=100) | 2026 | Remove | 2026 IPFS addition follows a 2025 ownership transfer; neither proves an artwork debut. |
| [EASTPEACE](https://api.xcp.io/v2/assets/EASTPEACE/issuances?limit=100) | 2026 | Remove | 2025 sends precede 2026 metadata. Current image date is unresolved. |
| [BATRACHOLOGY](https://api.xcp.io/v2/assets/BATRACHOLOGY/issuances?limit=100) | 2026 | Remove | 2026 IPFS additions follow a 2025 transfer; no independently dated release found. |
| [ORANGEBURN](https://api.xcp.io/v2/assets/ORANGEBURN/issuances?limit=100) | 2026 | Remove | 2023 edition issuance, lock and sends precede the 2026 IPFS addition. Do not call that addition a new artwork without proof. |
| [TRASHWAVE](https://api.xcp.io/v2/assets/TRASHWAVE/issuances?limit=100) | 2022 | Keep | 2022 description explicitly identifies the art, with new edition supply, lock and distribution. |
| [KUBRADOR](https://api.xcp.io/v2/assets/KUBRADOR/issuances?limit=100) | 2023 | Keep | 2023 exact-asset Arweave metadata, lock and first distribution corroborate release. |
| [FARTRON](https://api.xcp.io/v2/assets/FARTRON/issuances?limit=100) | 2023 | Keep | Metadata explicitly describes a reused 2016 token with new collaborative coloring; 2023 lock corroborates the new rendition. |
| [BOMBERPEPE](https://api.xcp.io/v2/assets/BOMBERPEPE/issuances?limit=100) | 2023 | Keep | 2023 image and supply lock occur together, following the earlier name-only token; no conflicting earlier art evidence found. |
| [LANDWOLF](https://api.xcp.io/v2/assets/LANDWOLF/issuances?limit=100) | 2023 | Keep | 2023 metadata identifies the new AI portrait rendition. Invalid foreign issuances are excluded from the evidence. |
| [NAKAMOTOPEPE.NAKAMOTOPEPE](https://api.xcp.io/v2/assets/A14624195819120965849/issuances?limit=100) | 2022 | Keep | 2022 media, substantial edition expansion, lock and first distribution coincide. |
| [BELLATRIXCD](https://api.xcp.io/v2/assets/BELLATRIXCD/issuances?limit=100) | 2024 | Keep | 2024 edition expansion, distribution and media support later art use of the blank 2022 token. |
| [DANKBRRR](https://api.xcp.io/v2/assets/DANKBRRR/issuances?limit=100) | 2023 | Keep | 2023 media, lock and first distribution coincide. |
| [DRAGONS](https://api.xcp.io/v2/assets/DRAGONS/issuances?limit=100) | 2024 | Keep | 2024 reset/reissue, fairmint, media and distribution establish the new use, rather than the 2015 blank reservation. |
| [FAUXMAS](https://api.xcp.io/v2/assets/FAUXMAS/issuances?limit=100) | 2024 | Remove | Supply was already locked in 2022; only a 2024 JSON addition supports the later date. |
| [GOPHERCORN](https://api.xcp.io/v2/assets/GOPHERCORN/issuances?limit=100) | 2023 | Remove | December 2022 lock and January 2023 JSON straddle a year boundary; artwork release cannot be assigned from the latter alone. |
| [HOLYROSARY](https://api.xcp.io/v2/assets/HOLYROSARY/issuances?limit=100) | 2021 | Keep | 2021 image, lock and first distribution follow the blank 2018 reservation. |
| [JKROWLING](https://api.xcp.io/v2/assets/JKROWLING/issuances?limit=100) | 2022 | Keep | 2022 reset to a new edition supply, lock and image corroborate the new token use. |
| [LIMEWIRE](https://api.xcp.io/v2/assets/LIMEWIRE/issuances?limit=100) | 2026 | Keep | 2026 image, lock and first distribution follow a blank 2022 token. |
| [MAXKEISERNFT](https://api.xcp.io/v2/assets/MAXKEISERNFT/issuances?limit=100) | 2026 | Keep | 2026 image, lock and first distribution follow a blank 2023 token. |
| [MININGPEPEL](https://api.xcp.io/v2/assets/MININGPEPEL/issuances?limit=100) | 2024 | Remove | 2024 metadata identifies current art, but the token has zero locked supply. Do not describe it as a released edition; no replacement year asserted pending creator evidence. |
| [MTGMAGIC](https://api.xcp.io/v2/assets/MTGMAGIC/issuances?limit=100) | 2025 | Keep | 2025 ownership change, reset/reissue, media, lock and distribution establish the new edition; metadata's old signature date is not art evidence. |
| [NUTCORN](https://api.xcp.io/v2/assets/NUTCORN/issuances?limit=100) | 2023 | Keep | 2023 media and supply lock support current art use; earlier text describes the name rather than a dated artwork. |
| [PEPEAI](https://api.xcp.io/v2/assets/PEPEAI/issuances?limit=100) | 2023 | Keep | 2023 transfer, media, edition reissue, lock and distribution support the new release. |
| [PEPECREDIT](https://api.xcp.io/v2/assets/PEPECREDIT/issuances?limit=100) | 2023 | Keep | 2023 reset to a new edition supply, media and distribution corroborate the current art release. |
| [PEPEDARUMA](https://api.xcp.io/v2/assets/PEPEDARUMA/issuances?limit=100) | 2024 | Remove | 2022 description already identifies Daruma and Pepe number 1; 2024 metadata and sends do not prove the image was new. |
| [PEPERRINE](https://api.xcp.io/v2/assets/PEPERRINE/issuances?limit=100) | 2022 | Remove | 2022 JSON identifies the artwork but has no date; no corroborating release event resolves the 2017 token's earlier use. |
| [PINKPLATES](https://api.xcp.io/v2/assets/PINKPLATES/issuances?limit=100) | 2021 | Keep | 2021 image, lock and first distribution coincide after a blank reservation. |
| [POKEMONPEPE](https://api.xcp.io/v2/assets/POKEMONPEPE/issuances?limit=100) | 2021 | Keep | 2021 edition expansion, image and lock corroborate later art use; this is stronger than a metadata pointer alone. |
| [REDHOTPEPERS](https://api.xcp.io/v2/assets/REDHOTPEPERS/issuances?limit=100) | 2021 | Remove | 2017 subject-specific description and lock precede 2021 image attachment; no dated catalogue resolves the artwork's debut. |
| [SEANPEPE](https://api.xcp.io/v2/assets/SEANPEPE/issuances?limit=100) | 2026 | Keep | 2026 exact-asset metadata and lock follow a 2025 ownership transfer and earlier blank reservation. |
| [VCPITCHPEPE](https://api.xcp.io/v2/assets/VCPITCHPEPE/issuances?limit=100) | 2021 | Keep | 2021 image and supply lock corroborate later art use of the blank 2017 token. |
| [VOORHEESPEPE](https://api.xcp.io/v2/assets/VOORHEESPEPE/issuances?limit=100) | 2022 | Keep | 2022 image and supply lock corroborate later art use of the earlier name-only token. |
| [BAAD](https://api.xcp.io/v2/assets/BAAD/issuances?limit=100) | 2023 | Keep | The image is embedded in a valid April 2023 STAMP issuance itself, followed by a 2023 lock; 2024 activity is not the debut. |
| [CORNDALI](https://api.xcp.io/v2/assets/CORNDALI/issuances?limit=100) | 2025 | Keep | Current painted rendition is distinct from the 2021 DALICORN collage; DALICORN.CHEAPFAKE and CORNDALI metadata appear together in July 2025. |
| [PEPECROWLEY](https://api.xcp.io/v2/assets/PEPECROWLEY/issuances?limit=100) | 2023 | Remove | 2016 subject description and locked supply precede 2023 media and dispenser. No replacement year asserted pending comparison of earlier and current artwork. |
| [DANKAFRARE](https://api.xcp.io/v2/assets/DANKAFRARE/issuances?limit=100) | 2023 | Keep | 2023 reset, media, lock and distribution support later use; invalid earlier attempts are excluded. |
| [POISONPEPE](https://api.xcp.io/v2/assets/POISONPEPE/issuances?limit=100) | 2023 | Keep | 2023 media, edition expansion, lock and distribution coincide following ownership change. |
| [SUPERAREPEPE](https://api.xcp.io/v2/assets/SUPERAREPEPE/issuances?limit=100) | 2023 | Remove | Recovered canonical Arweave JSON explicitly refers to the character existing since 2016 and later joining Fake Rares. The 2023 attachment and dispenser do not establish a new artwork. |
| [TICKETPEPE](https://api.xcp.io/v2/assets/TICKETPEPE/issuances?limit=100) | 2023 | Remove | 2018 ticket description and lock precede 2023 transfer, media and send. No replacement year asserted pending a dated image comparison. |
| [JONGPEPE.NUK](https://api.xcp.io/v2/assets/A11996232138131859938/issuances?limit=100) | 2023 | Remove | 2023 IPFS and lock follow multiple transfers, but metadata does not independently establish the image's debut. |
| [JONGPEPE.NUKETOWN](https://api.xcp.io/v2/assets/A15264664874460264660/issuances?limit=100) | 2023 | Remove | 2017 locked edition and sends precede 2023 IPFS; no evidence establishes that the later attachment represents new art. |
| [KOKO](https://api.xcp.io/v2/assets/KOKO/issuances?limit=100) | 2021 | Keep | November 2021 parent media, ownership and coordinated illustrated child editions; complete family reviewed in PR 418. |
| [PEPESCOBAR](https://api.xcp.io/v2/assets/PEPESCOBAR/issuances?limit=100) | 2021 | Remove | 2018 named subject and lock precede 2021 JSON. Current catalogue identifies the work but does not date its creation. |
| [WINNIEPEPE](https://api.xcp.io/v2/assets/WINNIEPEPE/issuances?limit=100) | 2021 | Remove | 2018 subject-specific description precedes 2021 JSON; initially wrong-asset JSON also cautions against equating attachment with debut. |
| [RARES](https://api.xcp.io/v2/assets/RARES/issuances?limit=100) | 2025 | Keep | Zero-supply reservation becomes a newly issued, illustrated, locked edition in 2025 with distribution. |
| [PEPEROTHKO](https://api.xcp.io/v2/assets/PEPEROTHKO/issuances?limit=100) | 2021 | Remove | 2021 metadata and distribution support use by that year, but the mutable JSON's edition quantity does not match the original issuance. No replacement year asserted pending a dated original-image source. |
| [PUREPEYE](https://api.xcp.io/v2/assets/PUREPEYE/issuances?limit=100) | 2021 | Correct to 2019 | March 2019 description explicitly certifies the pictured silver coin, including its two designs and dimensions; 2021 adds its photograph. |
| [STEAMBOAT.WILLIE](https://api.xcp.io/v2/assets/A8391038367042602072/issuances?limit=100) | 2024 | Keep | 2024 positive supply, media, lock and distribution follow a zero-supply reservation. |
| [JOINORDIE](https://api.xcp.io/v2/assets/JOINORDIE/issuances?limit=100) | 2024 | Keep | 2024 lock, JSON and first distribution corroborate later art use. |
| [LAWANDORDER](https://api.xcp.io/v2/assets/LAWANDORDER/issuances?limit=100) | 2024 | Keep | Exact-asset metadata explicitly dates the work June 20, 2024; media, lock and distribution agree. |
| [PANICINDC](https://api.xcp.io/v2/assets/PANICINDC/issuances?limit=100) | 2024 | Keep | 2024 artwork, expanded edition, lock and distribution coincide. |
| [PEPEAMMOUS](https://api.xcp.io/v2/assets/PEPEAMMOUS/issuances?limit=100) | 2026 | Keep | 2026 ownership transfer, creator-hosted metadata and lock coincide with distribution. |
| [JESUSWOJAK](https://api.xcp.io/v2/assets/JESUSWOJAK/issuances?limit=100) | 2025 | Keep | January 2025 metadata timestamp, additional edition supply, lock and distribution agree. |
| [TOMBRAIDER](https://api.xcp.io/v2/assets/TOMBRAIDER/issuances?limit=100) | 2023 | Keep | 2023 ownership change, image, lock and first distribution support later use of the old named token. |
| [GIFTGOATS](https://api.xcp.io/v2/assets/GIFTGOATS/issuances?limit=100) | 2026 | Keep | 2026 official catalogue JSON, additional edition supply and lock corroborate later art use. |
| [PEPEBASYASHI](https://api.xcp.io/v2/assets/PEPEBASYASHI/issuances?limit=100) | 2023 | Keep | 2023 image and supply lock corroborate later art use of the blank 2021 token. |

Additional sources: [CORNSEC creator commit](https://github.com/terhnt/terhnt.github.io/commit/58a650e042f47a0ce683aa34988e770b523b481b), [Bitcorn CORNSEC catalogue](https://bitcorns.com/cards/CORNSEC). Activity corroboration can be reproduced with the same asset ID at `/v2/assets/<asset>/activity`; it is monthly aggregated activity, not a sale ledger.

## Founded-year screen

The returned sample order is not guaranteed to identify the earliest member. Different member and project years are normal for curated directories and reused parent tokens. A null media result means no recognized media pointer in that history, not that the art did not exist. Entries marked follow-up need primary launch evidence; their existing founded value is left unchanged. No founded year is populated from the minimum token timestamp.

| Collection | Existing founded | Screen outcome | Sample assets |
| --- | --- | --- | --- |
| 17art | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | GAMESOFTRUMP, WORLDOFPEPE, PEPEHEFNER |
| age-of-chains | 2016 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | MYRIADCARD, QORACARD, RUNEWIZARD |
| age-of-rust | 2017 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | ROGUEMECH, FGTNWASTELND, THEBOUNTY |
| alchemist2926 | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RARETEXAN.ALCHEMIST2926-1, RARETEXAN.ALCHEMIST2926-2, RARETEXAN.ALCHEMIST2926-4 |
| artolin | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | PEPETSHIRT, PEPEYOTES, FINEARTPEPE |
| assetic | 2023 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | TWERK, RAREASS, PEPASS |
| atomo | 2018 | Sample histories consistent; no discrepancy found. Launch not independently certified. | LATOMOAL, LATOMOAR, LATOMOB |
| avime | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A17066957622315622000, A9745158396122567000, A2662775467385637400 |
| barnyard-club | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | WETAGAIN, CRYPTOCORNS, CORNTAGION |
| based-intellectuals | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A5610982233139943000, A18330636243375071000, A1256522037748135400 |
| bassmint | 2022 | Keep 2022: project site documents Genesis vinyl in August 2022; existing tracks may predate the collection. | MUSICART, FAKESHERO.FAKESPOWER, MANTRAPEPE |
| battle-batty-baboonies | 2025 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | BATTY, BATTY.BLINDBOX, BATTY.001 |
| bitcoin-coaster | 2021 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | ORANGECORN, HATHAT, COASTERGUY |
| bitcoin-stamps | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A7337447728884561000, A6360128538192758000, A3121984346241143000 |
| bitcoin-war-bonds | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | A13666694206942069420, WARBONDS, ENDFIAT |
| bitcorn-cards | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | CORNGEISHA, CORNGEISHA.SKETCH, CORNARTIST.FAKE |
| bitcorn-crops | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | CORNHOLIO, CORNTUKTUK, HELIPAD |
| bitgirls | 2016 | Sample histories consistent; no discrepancy found. Launch not independently certified. | CHIKARINVIX, DJASANYANVIX, MIZUKIVIX |
| bitquest | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BITQUEST.2, BITQUEST.1, BITQUEST.3 |
| blackbox | 2021 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | BLACKBOX, BLACKBOX.2021.Mystery_Listing_A, BLACKBOX.2021.MYSTERY_LISTING_B |
| blockcard | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BLOCKCARD.1, BLOCKCARD.2, BLOCKCARD.3 |
| blockchain-og | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BLOCKCHAINOG.Blockchain4aGangsta, BLOCKCHAINOG.RHYME1, BLOCKCHAINOG.RHYME2 |
| blue-bear | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BLUEBEAR, BLUEBEAR.magic, BLUEBEAR.vapor |
| book-of-wisdom | 2025 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BOOKOFWISDOM, BOOKOFWISDOM.113, BOOKOFWISDOM.LandofMilkandHoney |
| bootleg-pepe | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BOOTLEGPEPE.RAREPEPE, BOOTLEGPEPE.PEPENATION, BOOTLEGPEPE.DANKPEPE |
| chain-chronicles | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | CCONEMAY, CCONEJUN, CCONEAUG |
| colours-of-pepe | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | COLORSOFPEPE, COLORSOFPEPE.COP4R, COLORSOFPEPE.COP1G |
| comedianas | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A1234000000000000001, A1234000000000000002, A1234000000000000003 |
| common-coco | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A9942055563966637280, A1749565892089555200, A438920412538506021 |
| common-frog-club | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | COMMONFROG.4, COMMONFROG.1, COMMONFROG.5 |
| community-rewards | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | WELCOMEPEPE, LAYERSOFLIFE, GREENMEDAL |
| coraline | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | CORALINE.JAMESHALLIDAY, CORALINE.KEISERPEPE, CORALINE.PEPETHEFROG |
| corruptionaires | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | CORRUPTJEFF, CORRUPTMARK, CORRUPTCZ |
| counterparty | 2014 | Protocol catch-all; 2014 is not a shared artwork date. | TEST, BEARHUG, TATIANACOIN |
| counterparty-bitbowl | 2014 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | FORTYNINERS, SEAHAWKS, BRONCOS |
| crystalscraft | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | GDCNOVADEMO, SILLYCHAIN, SOGLOTUS |
| cubism-nakamoto | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | CUBINAKAMOTO, CUBINAKACASH, CUBINAKAREDO |
| dank-feathers | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | DANKFEATHERS, DANKFEATHERS.ONE, DANKFEATHERS.EIGHT |
| dank-rares | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | KEKLUMINATI, DANKAUCTION, DANKHACK |
| darkfarms | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MRRIBIT, OLDHOMERPEPE, LAUNDROPEPE |
| david-goliath | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A11121933663551267915, A11139877173220437651, A11103103220012747506 |
| derp-van-gogh | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | DERPVANGOGH, DERPVANGOGH.TREE, DERPVANGOGH.MT1 |
| determinpepe | 2024 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | DETERMINED, DETERMINPEPE, DETERMINPEPE.FIRSTCARD |
| diecast | 2017 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | BFORDMORSXVI, BFORDRKMCXVI, BPOLOSOMCXVI |
| diffuse-pepe | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | DIFFUSEPEPE, DIFFUSEPEPE.1, DIFFUSEPEPE.2 |
| dinosaurios-element-beasts | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | EARTHBEAST, FIREBEAST, METALBEAST |
| dj-pepe-badger | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | DJPEPEBADGER, DJPEPEBADGER.BTCDONTCARE, DJPEPEBADGER.MANERE-TRANQUILLITAS |
| dragons-fantasy-2022 | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | FROGDRAGON, FIDELITYDRAG, WARDRAGON |
| drooling-ape-bus-club | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | DROOLGREASE, DROOLMCFRIES, DROOLPEEN |
| egyptianartifacts | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | EGYROSE, EGYNEFE, EGYTUTA |
| eternal-art | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | ETERNALART.SALVATOR, ETERNALART.LASTSUPPER, ETERNALART.MONALISA |
| evolving-pepe | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | EVOLVINGPEPE.Kicking-Tail, EVOLVINGPEPE.First-Spark, EVOLVINGPEPE.Dreaming-Cell |
| fake-ape-club | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | XANGRYFRIES, KINGAPE, INSTAAPEGRL |
| fake-commons | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | NOTAFAKERARE, KEKOWSKI, HPIC |
| fake-ransom | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | FAKERANSOM, FAKERANSOM.sacrifice, FAKERANSOM.specialdelivery |
| fake-rares | 2021 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | FAKEASF, FREEDOMKEK, YOURBASEPEPE |
| faux-bitcorn | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | SOUTHCORN, CORNPIGEON, CORNATION |
| faux-sogs | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | BITGEMZ, ERMAGHERDCD, LAMBOCORN |
| footballcoin | 2017 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | XFCPALMORATA, XFCPCARVAJAL, XFCPCASEMIRO |
| force-of-will | 2016 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | FWCFCRABBITC, FWCFCDREAMSC, FWCFCRETELLC |
| gameicon | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | GDCNOVADEMO, INDRIK, BABAYUGA |
| genesis-flips | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | GENESISFLIPS.PHUNCHKINS, GENESISFLIPS.FAKEAPES, GENESISFLIPS.C1S1 |
| hanseikai | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | HWFASHION, KAMATTE, KOEDAME |
| hnftfest | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | HNFTFEST, HNFTMMXI, HNFTMMXII |
| hodlpet | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | HODLPET, DEVTHPETHODL, DRACOPEPITO |
| homerpunks | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A7957585031266907000, A7751074030723430000, A4883084586990725000 |
| hondacivic-garage | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | HONDACIVIC.S1.0003, HONDACIVIC.S1.0004, HONDACIVIC.S1.0001 |
| journey-paint | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | JOURNEYPAINT.COWOFTHEDAY.03, JOURNEYPAINT.COWOFTHEDAY.04, JOURNEYPAINT.TENNISOFTHEDAY.00 |
| kaleidoscope | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | MODRNMUSTARD, INVISIBLPEPE, CORNTUKTUK.PIGINTUKTUK |
| kenergy | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | KENERGYBS, KENERGYOR, KENERGYBB |
| kevins | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | KEVINS.NEO, KEVINS.NOKIA, KEVINS.BART |
| koko | 2021 | Complete family history reviewed in PR 418; 2021 art use, with ATOMO a 2022 exception. | KOKO, KOKO.CAT, KOKO.NATURE |
| koko-variants | 2021 | Complete family history reviewed in PR 418; subset does not create a separate early launch. | KOKO, KOKO.CAT, KOKO.NATURE |
| kvlt-of-kek | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | KVLTOFKEK, KVLTOFKEK.1x1, KVLTOFKEK.3x3 |
| kyc | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | DIMZ.KYC, DIMZ.KYC.100, DIMZ.KYC.50 |
| lfg-collection | 2025 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | LFGSWARM, FAKPROPHECY, FAKEPROPHECY |
| lil-pepe | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | LILPEPEONE, LILPEPETWO, LILPEPEFOUR |
| litocoin | 2018 | Sample histories consistent; no discrepancy found. Launch not independently certified. | LITOCOIN, LITOCOIN.VINCAS_KUDIRKA_5_EUR, LITOCOIN.JONAS_BASANAVICIUS_5_EUR |
| love-love-pepe | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | FULLLOVEPEPE, HODLTIGHT, LOVEDREAMY |
| mafia-wars | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | SOLDIER, COLOMBO, NOTRAREPEPE |
| magatama | 2016 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MAGATAMARD, MAGATAMARDFR, MAGATAMARDFV |
| maskamoto | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MASKAMOTO.01, MASKAMOTO.02, MASKAMOTO.03 |
| memorychain | 2017 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | THEDAODEAD, XEMURAI, THEFINTECH |
| mfers | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MFERS, MFERS.MPNKR, MFERS.SNOOP |
| minifigs | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MINIFIGS.BLOBBY, MINIFIGS.PEPEFRENS |
| moaa | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | CUPCAKES, MOVIETICKETS, SAUCE |
| modern-rare | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MODERNRARE.SPONGEBOB, MODERNRARE.VAPOR, MODERNRARE.TERRACOTTA |
| modern-relics | 2023 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | COLLECTOR, LUCIFER, GREED |
| monster-book | 2022 | Correct to 2023; primary evidence above. | GRAILRARE, FOUNDERCARD, THESLAYER |
| moppy-go | 2017 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MOPPYA, MOPPYB, MOPPYC |
| mstrpepes | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MSTRPEPES.VICTORYSTELEOFNARAMPEPE, MSTRPEPES.PEPEOFAKKAD, MSTRPEPES.KARAHANPEPE |
| mtm-series | 2016 | Keep 2016: original music-access project predates the 2022 image additions. Image absence is not music absence. | MTMALBUM, MTMPRODUCER, MTMSONG |
| new-liberty-standard | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BACKADAM, DAVIDCHAUM, HFINNEY |
| night-become-butterflies | 2016 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BIJOU, MOONVIOLET, LIONHEART |
| nilicoins | 2014 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | ICOKE, NILI, IAPPLE |
| no-dip-for-pepe | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPERITOS, PEPESODA, PEPESOFT |
| noogs | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | NOOGS, NOOGS.1, NOOGS.2 |
| npcs | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | NPCS.AnpcitaFemfreq, NPCS.CNNPC1, NPCS.NPC00473777 |
| oasis-mining | 2017 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPEEYES, ETHTATTOO, MONABAACHAN |
| og-san | 2025 | Sample histories consistent; no discrepancy found. Launch not independently certified. | OGSAN.JAKESHANNON, OGSAN.ADAM, OGSAN.HEROYUTA |
| otherworld | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | OTHERWORLD.GameOfSouls, OTHERWORLD.EarthEaters, OTHERWORLD.TheLastPassage |
| peekaboo | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEEKABOO.LOONEYBINLADEN, PEEKABOO.SATOSHI, PEEKABOO.DJPEPE |
| penisium | 2017 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPEDROP, DICKBUTTS, PENISIMOON |
| pepe-flags | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | PEPEFLAGAZ, PEPEFLAGCA, PEPEFLAGFL |
| pepe-flyers | 2022 | Correct to 2023; primary evidence above. | PEPEFLYERS, PEPEFLYERS.V1.1, PEPEFLYERS.V1.6 |
| pepe-model-p | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A2681552342852833300, A6329591964629042000, A9879378393227570000 |
| pepe-pals | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPEPALS, SATOSHIPAL, PEPEPALS.FOUNDERS |
| pepe-panther | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPEPANTHER, PEPEPANTHER.GREEN, PEPEPANTHER.BLUE |
| pepe-poi | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | XXIIPEPEPOI, XXIPEPEPOI, XXIPEPEPOI.3 |
| pepe-stamps | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPESTAMPS, PEPESTAMPS.1, PEPESTAMPS.5 |
| pepe-vote | 2018 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | COURAGEFROG, DANGERPEPE, QANON |
| pepedickbutt | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPEDICKBUTT.1, PEPEDICKBUTT.3, PEPEDICKBUTT.10 |
| phockheads | 2022 | Correct to 2021; primary evidence above. | PHOCKHEADS, PHOCKHEADS.1, PHOCKHEADS.3 |
| phunchkins | 2021 | Correct to 2022; primary evidence above. | PEPEDOM, FAKEMONSTER, BLUNTMONSTER |
| pizza-day-note | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PIZZADAYNOTE.2022POST, PIZZADAYNOTE.JEREMY2022 |
| plebz | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PLEBZ.ORANGEPILLED, PLEBZ.BIGPLEB, PLEBZ.BIG |
| progeny-beasts | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PINATA.PROGENY.GOLD, PINATA.PROGENY, PINATA.BLACKDOGBEAST |
| proof-of-visit | 2017 | Sample histories consistent; no discrepancy found. Launch not independently certified. | TIGNES, PLANKS, VALDISERE |
| punchpuff | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PUNCHPUFF.04c38c001d0, PUNCHPUFF.0471be001d0, PUNCHPUFF.0428c4001d0 |
| punk-frens | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PUNKFREN.1, PUNKFREN.10, PUNKFREN.8 |
| punks-bitcoin | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PUNKSBITCOIN, PUNKSBITCOIN.1, PUNKSBITCOIN.2 |
| punycodes | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PUNYCODES, PUNYCODES.xn--dp8h, PUNYCODES.xn--g28h |
| pups | 2021 | Complete family history reviewed in PR 418; 2015 reservation reused for 2021 illustrated family. | PUPS, PUPS.CHONK, PUPS.SHEPHERD |
| pups-variants | 2021 | Complete family history reviewed in PR 418; same parent chronology as PUPS. | PUPS, PUPS.SHEPHERD |
| queenartcoin | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | QUEENARTCOIN, QUEENARTCOIN.NAKAMOTOAPE |
| quest-frens | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | QUESTFRENS, QUESTFREN.1, QUESTFREN.2 |
| rare | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RARE, RARE.PEPE, RARE.PEPE.8 |
| rare-bobo | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A808011111111111111, A4505491114736373000, A808022222222222222 |
| rare-coco | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RARECOCO, MEMECOINCARD, COCOGREEN |
| rare-dream | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RAREDREAM.1, RAREDREAM.2, RAREDREAM.3 |
| rare-gogo | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RAREPEP, RAREGOGO, OLGOAT |
| rare-lands | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MACHUPEPECHU, CNSTRCTNPEPE, KEKOWSKILAND |
| rare-ordinal-directory | 2023 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | WINGSPEPE, DANKAFRARES, CHANCHU |
| rare-pepe | 2016 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | PEPEONECOIN, GUARDSPEPE, FSMPEPE |
| rare-pigeons | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | BREADWHALE, EXITBIRD, NAKAPIGEON |
| rare-shadilay | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | ROBCOIN, HAIRSHADILAY, RARESHAD |
| rare-vision | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RAREVISION, RAREVISION.MIGOSH, RAREVISION.MURPH |
| rarefootball | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | EUSEBIO, VANBASTEN, BENZEMA |
| rarepenpen | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PENPENGEON, RAREPENPEN, PENPENRARE |
| rarepepecoins | 2019 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | HIPPIEPEPE, PECTERIA, ILUMINATRARE |
| raresocks | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | SOCKSCAMCASH, PASSIONSOCK, SOCKORMAGIC |
| retroxcp | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | RETROHAIR, DROOLBATTLE.SPACEAPE, KONGCOUNTRY |
| rpepe-series | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RPEPEI, RPEPEII, RPEPEIII |
| rude-relics | 2023 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | DIARRHEA, FUCKED, MENAGEATROIS |
| sarutobi-island | 2016 | Sample histories consistent; no discrepancy found. Launch not independently certified. | NINJASUIT, MANDELDUCKCD, SARUTOBIPEPE |
| satoshicard-10-years | 2025 | Sample histories consistent; no discrepancy found. Launch not independently certified. | SATOSHITEN, SACREATORBLK, ELSATOSHI |
| scannable-nfts | 2022 | Keep 2022: official embedded catalogue publishes the sampled cards on January 5, 2022 despite 2021 token histories. | QRPEPE, QRHENDRIX, QROUTOFHELL |
| sharp-cards | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | YEARCLOSE, BREADTWO, FLATMARKET |
| skara | 2017 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | CLUBARISE, HELMARISE, JORINCOVER |
| slowfastfun | 2025 | Sample histories consistent; no discrepancy found. Launch not independently certified. | REDOX, GRAV, VYNL |
| snibby | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | SNIBBY, SNIBBY.no.soup.for.you, SNIBBY.magic |
| sound-money | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | DJPEPE.SOUNDMONEYLP01, DJPEPE.SOUNDMONEYLP02, DJPEPE.SOUNDMONEYLP03 |
| spamgelo | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | DANKSPAMGELO, SPAMAMOTO, IAMSPAMGELO |
| spells-of-genesis | 2015 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | DIVINEKNIGHT, VISCULABEETL, VISCULALADYB |
| spooky-pepes | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | SPOOKYPEPES.WEREFANK, SPOOKYPEPES.FAKENSTEIN, SPOOKYPEPES.NOSFAKERATU |
| springfield-pepes | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | FLAMINGMOE, SIDESHOWPEPE, WHOSHOTBURNS |
| squid-ape-game | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | SQUIDAPEGAME, SQUIDAPEGAME.GAMEMASTER, SQUIDAPEGAME.PLAYER001SR |
| stampedrats | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A9900000426065257340, A9900000448278813039, A9900000551007169269 |
| stampepes | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A11721653948588048000, A6120695978112373000, A11472737734433417000 |
| stampunks | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A999999999999999991, A876876876876876871, A7773777377737773777 |
| testgallery | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | MONSTROSITY, THEKISS, BUFFALOS |
| the-counterpart | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | GIFT, GLASS, IRON |
| the-fakamotos | 2023 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | THEFAKAMOTOS, THEFAKAMOTOS.56, THEFAKAMOTOS.288 |
| the-future-of-forgotten-relics | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | IDEOF, BITCRYSTAL, CARDAMP |
| the-greypepe-project | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | STALKERGREY, TRISOLARIS, PEPEANUNNAKI |
| the-pepe-project | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | NAKASENDIT, PEPERAREST, COVPEPE |
| the-pixel-gods | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A14599715268784402000, A18386080924651407000, A12034202815016155000 |
| the-wojak-way | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | RAREWOJAK, WOJACKBLOCK, WOJABSTRAKT |
| thug-life-notes | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | THUGLIFENOTE.HAL, THUGLIFENOTE.GOX, THUGLIFENOTE.JIHAN |
| topini | 2024 | Sample histories consistent; no discrepancy found. Launch not independently certified. | TOPINI.DUMP, TOPINI.OMAMA, TOPINI.POURIN |
| umeko-space-colony | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | UMEKOUFO, UMEKOSPRING, UMEKOMARS |
| unatrare | 2026 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | PEPEYROSE, GIFTGOATS, PEMBLEMVAULT |
| utxo-bots | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A9944877460932889000, A14544102098572384000, A16268440286464205000 |
| vadam-kadmon | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | VADAMKADMON.THE_BITCOIN_RELIGION_GENESIS, VADAMKADMON.The_Bitcoin_Religion_GENESIS_vid, VADAMKADMON.THE_BITCOIN_RELIGION_III |
| vapor-magic | 2022 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | VAPORMAGIC, VAPORMAGIC.NAKAMOTO, VAPORMAGIC.METAL |
| viva-las-stamps | 2023 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A12236109058931544000, A10835789004916134063, A14571539890130820786 |
| waak | 2026 | Sample histories consistent; no discrepancy found. Launch not independently certified. | WAAK.MCAFFEE, WAAK.LOONEY, WAAK.HAIRPEPE |
| weex-bitcoin-art | 2015 | Sample histories consistent; no discrepancy found. Launch not independently certified. | A1672758370327094000, A347162147702845600 |
| wrbpt | 2025 | Sample histories consistent; no discrepancy found. Launch not independently certified. | WRBPT.BlindFaithPepe, WRBPT.PepeLiberation, WRBPT.PEPELIBERATION |
| xcer | 2021 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | VILLAR, XADAM, XSATOSHIX |
| xcp-superstars | 2023 | Follow-up: sample dates differ or no on-chain media; requires project launch evidence, not automatic backdating. | ROWDYPEPE, MOUNTYMIKE, TORNATHAN |
| xcpinata | 2021 | Sample histories consistent; no discrepancy found. Launch not independently certified. | COOKIES, CALENDAR, BROWNIE |
| xcpinata-miscellaneous-works | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | PEPETO, PINEAPPLEEGG, RATTY |
| xcpinata-red-collection | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | REDGLASSES, REDPAPER, REDBLADE |
| zetra-coa | 2022 | Sample histories consistent; no discrepancy found. Launch not independently certified. | ZETRA.BTCSTENCIL.300.COA, ZETRA.BTCSTENCIL.299.COA, ZETRA.BTCSTENCIL.297.COA |

Supporting retained-date sources: [Bassmint publisher](https://www.bassmint.wtf/), [MTM Series publisher](https://www.mtmseries.io/). Scannable catalogue publication dates must be distinguished from token registration. The collection-screen follow-ups remain open; this report does not label those verified.

Canonical recovery example: [SUPERAREPEPE original metadata](https://arweave.net/FU7Bn-Zp_Dv3CwixYr8_l1bHcDYkNsrQ_X5A2A8SUQQ) resolves at the transaction root even though the original asset JSON subpath returned 404. Its description contradicts treating the 2023 metadata attachment as proof of newly created art.
