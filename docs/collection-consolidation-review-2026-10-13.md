# Collection consolidation review — 2026-10-13

## Scope and method

Screened all 1,115 starting collection names and metadata, including all four parenthesized names. Compared explicit memberships, then grouped by existing Artist credits and explorer issuer addresses rather than relying on spelling. Supplemented the previous 10,325-asset Counterparty research inventory with 5,012 exact xcpio-core lookups covering missing addresses in collections with at most 100 members. This produced 100 shared-issuer candidate groups and 87 shared-artist candidate groups (excluding variation collections from those candidate counts). An issuer is a research lead, not proof of authorship or common collection identity. Larger collections do not have exhaustive refreshed address coverage in this pass.

The final normalized export contains 1,108 entries. Exact membership comparison covers 1,107; Bitcoin Stamps is dynamically sourced and excluded from the static comparison. Numeric identities and longnames were reconciled where explorer facts were available. No two remaining explicit collections with at least two members have identical asset sets. These are screening results, not a claim of a new visual/source audit of every asset or all 100 issuer groups.

## Changes

| Decision | Evidence and retained distinctions |
| --- | --- |
| Three Bitman entries → Bitman | Crypsi's [Banks](https://crypsi.com/pacman-banks/), [Dark Markets](https://crypsi.com/dark-pacman/) and [Fiat Currencies](https://crypsi.com/pacman-currency/) pages use the same Bitman title, medium, dimensions and original year. All 15 tokens retain identity, credit and 2022 Counterparty edition date. Theme preserves the three subjects. |
| BTCBANKNOTE → Bitcoin Banknote | Exactly the same four assets. Transfer variation_of and the visual review evidence to the existing primary collection. |
| CLOWNTECH → Clown Technology | Exactly the same two assets; same printed card composition and animated edition. Preserve variation_of in the surviving collection. |
| COLORSOFPEPE → The Colours of Pepe | Exactly the same five assets; parent and four component panels. Preserve variation_of. |
| FAKEITMAKEIT → Fake It Till You Make It | Exactly the same four assets; linked metadata explicitly connects parent and companion designs. Preserve variation_of. |
| Emblem Test Cards → Emblem Cards | Same issuer, Shannon Code credit, Emblem metadata host and four printed rarity levels. Eight tokens retained. Design and Rarity filters distinguish the Logo and Vault Test groups. [Live JSON](https://emblem.finance/EVTESTCOMMON.json) confirms identity, issuer and EmblemVault profile. Editorial consolidation does not assert one historical marketing release. |

No artist credits or unique assets are removed. Primary membership total stays 64,569; 15 redundant secondary memberships disappear. Existing dated evidence is preserved, including the distinction between physical artwork dates and token editions. Retired page routes are redirected by marketplace; signed offers are not moved between collection scopes. Read-only checks found no offers under any retired slug at review time.

## Parenthesized names

- Psychedelic Cards (Cam) → **Psychedelic Cards**. Artist credit remains Cam.
- ClayPepe (Mekabu) → **Mekabu’s ClayPepe**. Keep separate from CryptoClay's project.
- Dragons & Fantasy (2022) → **Dragons & Fantasy**. Year already has its own field; the Curation badge and unconfirmed original-project wording remain.
- Pepe Tarot (SHEWOLF) → **SHEWOLF’s Pepe Tarot**. Keep separate from Motopikl's pixel-art Tarot Pepe.

## Closely examined candidates kept separate

| Candidates | Reason |
| --- | --- |
| PEPELAVANDAL / PEPELEVANDAL | Shared collaborators but separate parents and compositions: armed street figure versus rooftop graffiti scene. Live Coindaddy JSON returns different issuing addresses and different original media. Similar spellings do not establish one series. |
| Pepe Cartel Frogs / Rares / PepeCartel | Project JSON explicitly assigns distinct catalog categories. Same publisher alone does not make these duplicates. A future umbrella view could expose the categories as filters, but this pass does not replace the source's separate groupings. |
| Vizique portfolio sections | The artist's [By Series & Style](https://vizique.com/by-series-style/) page explicitly publishes these themes and arcs. Shared issuer is expected; no blanket merge into an artist-named collection. |
| Blue Bear / Blue Bull / Blue Swan | Same artist/address, distinct characters and source parent families; representative CDN art compared. Shared blue styling is insufficient to assert a single named release. |
| MDRN / MDRNFLOONEY | Shared Arwyn issuer but different parent compositions and namespace families; representative CDN art compared. |
| Pepabstract / Pepabstracts | Luis Simo composition versus Chaotic Crypto abstract portraits; different artists and bodies of work. |
| Lil Pep / Lil Pepe | Papeto versus NORMANCOMICS; distinct projects despite similar names. |
| Bitcoin Heads / Leftist Tears | Shared creator/address but explicitly different printed series; shared template is not duplication. |
| KOKO / PUPS | Same Wheeler address, different named animal families; retain separate. |
| XCPinata categories | Shared Kevin Ferreira credit does not override the artist's named collections. |

The ten remaining high-overlap pairs below are proper subsets, not duplicate asset lists. The variation entries deliberately omit distinct companion compositions. Their presence remains an editorial choice; this review does not automatically expand variation_of to cover those different works.

| Family | Variation subset | Shared / family / subset |
| --- | --- | --- |
| corntoshi | corntoshi-variants | 4 / 5 / 4 |
| fiatvulture | fiatvulture-variants | 2 / 3 / 2 |
| future-trash | futuretrash | 6 / 7 / 6 |
| koko | koko-variants | 5 / 8 / 5 |
| pantherfive | pantherfive-variants | 8 / 10 / 8 |
| pepaganda | pepaganda-variants | 16 / 20 / 16 |
| pups | pups-variants | 2 / 3 / 2 |
| satimotisse | satimotisse-variants | 2 / 3 / 2 |
| unipepecorn | unipepecorn-variants | 2 / 3 / 2 |
| zhongguo | zhongguo-variants | 2 / 3 / 2 |

## Issuer candidate index

This is a reproducible review queue from indexed identities, not 100 approved merges. Addresses with at least half of each listed collection's sampled membership are included. Artist credits are reviewed independently. Slugs reflect the screen before the final Emblem consolidation.

| Issuer | Candidate collections |
| --- | --- |
| 1Lr9VAEtiLYmbudE1DzoRkgjdDJzpDKXZK | absolut-bitcoin, bitcoinavatars, utxhoes-art |
| 16qe8o8EjugUJCVTdD8mF3atPCfYZwSStB | adopt-now, alien-ether, be-the-bullet, bitcoin-lighter, bitcoin-mantra, bitdrop, bitman, bomb-banks-not-people, btrash-squatters, crypsi-bitcoin-b, crypsi-hodl, crypsi-self-portrait, dollar-drain, end-the-fed-fud, fakeshark, fed-time, fork-the-fed, infected, j-demon, leave-the-darkside, liberte-egalite-fraternite, no2x, phockcrypsi, superheroes-of-crypto, the-real-crooks, tweet-me, uasf |
| 1DUJ8YzDvMTSjKtU6mz5i17EKaBDZ5dAnR | alchemist2926, mika-posters, pepcaramba, tiles, yeschad |
| 18NeUpEHzAquBcsncM5BGLR4VgaPXZhPp2 | ape-opoly, dj-kings, genesis-flips, happy-hippy, monsters-and-magic, pizza-day-note, springfield-pepes, the-way, thug-life-notes, vizique-abstracts, vizique-banknotes, vizique-beginnings, vizique-crypto-riffs, vizique-dank-af, vizique-gox, vizique-icons, vizique-lempicka, vizique-modern, vizique-nakamoto, vizique-news, vizique-painter-studies, vizique-parody, vizique-picasso, vizique-rick-and-morty, vizique-xcp-btc |
| 138kNmWCdJxGUGUxMzgcjMpHVhqGaDrh1k | baldies, barbified, bobbleheadz, btc-stamp-art, coraline, fake-arwyn, kevins, kitkats, kongs, looney-joe, mia-wallace, minifigs, musk-tweets, neons, peekaboo, pepe-girlz, pepe-stamps, pepefrenz, pruned, rare-peppers, test-cards, uk-stamps, waak, wojak-nft, xcp-artwork |
| 17TkmnxyBmtGBRgiQ4Y8Wa8HYYz6WWUtLj | battlecorn, bitcorn-cards, cornavirus, cornputer, dalicorn |
| 1GVShnTm4vRDgd45S3FcN3zPwFd17nfKB7 | bear-facts, blue-bear, blue-bull, blue-swan, modern-print, realtech-magic |
| 19Tu7667p1eXhCZRJG1fHtU2toodarGHoD | bear-soul, le-fake |
| 1DCNREVNE9937VWk52RwzrydGNSUQzGcTh | beeps, bootlegfake, fake-buffet, hyippepe, the-og-show, theos, ugly-lines |
| 112CLokAZxVTqQsMk4A8L2TxfiWBEh8ejf | bitcake, derp-van-gogh |
| 1DiyGJHQj4CUXieYzG7zyhM39dqoYgprQG | bitcoin-art-series, olympiad |
| 1PzxS9DcfrYNNGaaGWUZi6hQd2VsGhVk7U | bitcoin-heads, leftist-tears |
| 1691c3ZYSNmJc3PJGnkex5fnFdsw34LH57 | bitcoin-monument-series, shitcoins |
| 1BPpqvUTymr2jiiEddJ1YurBzr38h1wBW5 | bitcoin-religion, halving-blocks, vadam-kadmon, vadam-kadmon-game-cards |
| 1A62aP7McxBpuSsypGtbVoGqPj6N6rNMyT | bitcoin-rock, boostlegged, guggenmeme |
| 12gfmgV5D2ZgRSujoQRNzKJtibyqsUfbAw | bitskull, pepenity |
| 14gZero74D69jYoCgK6td9uP8QsnF2VTYi | blockchain-og, burn-pepe-cash, kekebrate |
| 145jMcvVvds39aAQh3Masp8s1VoVJbPG5x | bobomancer, cigarettes-are-money |
| 1P3KQWLsTPXVWimiF2Q6WSES5vbJE8be5i | bonklaw, frens-health, ham-fiction, kekfest |
| 14EnqBDJMHF5QWrmwCYE7WvfinyZZGHo89 | btc-got-talent, candevdosth, deerplight, fakachu, ordinalsclub, pikapechu, squid-ape-game |
| 1KiDcw62VqeP5subMAEVWtFH85zvkFagwy | btc-graffiti, the-symbol, zetra-coa |
| 15XMRfCCkGnm4eQ4r3iZTceMfw78L6MxHG | btc-max, conquerorare, dabc-playing-cards, dabufo, dark-pepe, javanese-pepe, karangskull, smallbrain, tizar-btc-art, wojakppl |
| 1AwS3wRFNCoymKs69BXjAA4VfgWvuKvx4j | btcpunk, crochet-pepe, ecuadorian, fake-space-dub, fayc, garbage-pail-memes, kekashic, mdrn, mdrnflooney, notapepemoto, unipepecorn, xcp-superstars |
| 1BH9sBVQ645gx2D3pfkc95SSvvEXpFhw2N | btcrn, rarepepecoins |
| 16yRstRXStVJJ1TN2S4DCWifyrCsetpma7 | btcrockpepe, dank-fakers, dj-pepe-badger, lfgrandpepe, littlepeepee, nobody-not-really, peaky-faker, pepe-wars, rare-ninjas, rarebanana, sgt-fakers |
| 1JhHUBcg3Mr89ZXXx7y3Htgv38REQ3hakJ | bug-card, chromie-card, franklinpepe, pepabstract, pepernica |
| 1755FLVc7BkQfRW841hV1XkeqnTw95SKsM | cardasf, fakeakira, pepemundi |
| 1CdiwX3MRLd46stmx7ge6VRXmUWgjZFt8Z | chemical-weapon, penny-green, pepa-beach, the-naufragh |
| 1AtZr6L6W4PWAkZMzUKbPbvEq4YFWVuUzT | claypepe, patamoula |
| 15A34TJCUiG7iQWQDdzqVavWQ7B5LQXCqn | cmyk-nakas, homerpunks |
| 1J8aLankHbmAHojseGRmWRZoTZKiNVi5GQ | coco-chanel, notnotable, zhongguo |
| 1BfbEGGtu5hvFBdTuYPtgVMvHboZHtdJ7Y | coldphocks, corntoshi, modernfeel |
| 1AWPiVC5d6vWfnHmteXG1mnNe3pXxAVRhV | comedianas, tangram-stamp |
| 16p2hGUnUoYtdttBHTkVhDUKBkDJuqjCck | constancy, harmonies, kaleidoart, onirism |
| 1Ph11drSBRhuMkhD9gBiCB1QXRqsf4R9Qb | cornan, johnny-dollar-editions |
| 1AmJChMdxVVR67kqrbpUHu2huYEfU2Yqw4 | counterfeit-superfakes, degenshield, doomerpepe, lil-pepe |
| 1EjsJwDp69L8hWn8t2tyQWaGAdMwCU9nEt | cryptopepes, every-pepes, moon-frog, paintpepunks |
| 1KeG8zBi5BXWhqEU8E9zpFfK8YntJSSuFm | dank-agent, inside-pepe-mind, pencil-movie, pepe-is-drunk |
| 1DPgkNoXJAwurQwnjWJFyfeXVgqNu7N2nM | dank-coq-pepe, pepe-handout |
| 1CGANw54nm3bgTqKBq1zm8h9cBVANAy6Gh | dankgans, diffuse-pepe |
| 14cvk4p4LN2Lpn4AzkjUHDr7A2tKerMhzk | dark-cash-grab, fake-wyoming, lana-del-taco, mourning-moos, pepaganda |
| 1EbsYbJ8HcVtUeLX2iFLwRLABUKLpNzKga | dasgoat, fakedust, handprints, rarereagan, reaganomics |
| 16HKHDh6KWHLJg9JuAWn128Bt5MM1s33nv | deathproof, gone-phishin |
| 1upFtuDuTFqDqcsHnXbVJ2p6TTukDyZz6 | desantis, eightbit |
| 1E2LutiSkjVh9K2WQgkpgaFHKciGHH7k7w | diamondank, nit-sabobo |
| 1AD3VBqdUhJhdqevQqW1jjLU27wautCYMf | dinosaurios-element-beasts, xcpinata-red-collection |
| 165RSk13jh4hTaJCYj93GFS3c4nQdimRr9 | djpepe, sound-money |
| 1G9FNrVAzib6zYGxpbKmYqH1PnsC2sw3hP | dogter, hodlcast |
| 12qXkAEwwz4h6283zRFu5pPG2Q6g3Z3uLP | don-fauci, usual-pepe-suspects |
| 13WLXaki2tdQS2PAWBJAVhYvzQN1LrEAXb | draculape, saline-ape |
| 14kGo5fm4WC6asYFFpxv6tsdVRmWmE2TDR | droolcula, droolers, dumbledrool |
| 1FedvShKs8ffFA9NxECncWcvPMCnjvsvPd | droollar, falmightyf, fiatvulture, mikadildo, money-not-war |
| 1K4BJHFbxD776ZCRFvRX4Sd5zjX32ScgUV | emblem-cards, emblem-test-cards |
| bc1qpgvlnxrs4q0cnve90t0hf57d53v0c6pnh9l39h | epstein-collection, usa-decline |
| 1N2JRS8ZgCqE3h3KvKEdtYj3UqkRmDMZ8u | fakabuki, pepekami |
| 1QBd4p8gWxnhGQieM7P1b8GacEoJiu8YRV | fake-destroy, grunchelf |
| 14d4MebjvmGS5SXUpW5sYFywEx3y8xXUn7 | fake-journey, og-crypto-art, pepe-babies |
| 1BkQQwpK8JV9GjmdcSncFTVayBr1LbyZ5L | fake-mastery, lovebeing-frogs-over-fiat-2022 |
| 1HS85uu1G9KUP9AvC8kez9K5SrGaRL8TQ4 | fake-medipepe, fake-vibes |
| 1DtVof3tnii8c5Skiv8Jcv1v4XuJM8qjRM | fake-mom, my-pepe-is-fake |
| 1F8tpGn5UVbYUKYoBgQ6FNcHkxAGUdPPN | fake-puzzle, i-got-blocked, just-a-girl |
| 1FZF4hGuyirVZ81YDuZZHVGBM7mxUBtXU7 | fake-rare-cap, infokek, pepe-torch |
| 1FakeRareTDi3PkHiehotQ2QAfUdw7Kzyc | fake-space, fakecezanne |
| 1Evr6d1sjq5aPjzheSyifF5qa8yMPV219P | fakeborghini, gigachad-granite, kek-club |
| 1A1ppYs3M4133Gw2TVpof1kYGDw6sAi21z | fakednara, madethispepe-namespace, vhs-pepe |
| 1K3AkTiWA9AaEQ1Vuz8KJK78ERbVrPtnS | fakeshero, pepethefake |
| 1APxNaxSgYTknypZ5tT8XMWti5M6CueYd7 | five-meo-dmt, pepe-memecoin, what-they-took |
| 1Mb5NTTZxDNo1ccASBdX7AP5zGD7czkoFW | flooneydooms, hodllage |
| 14Q7MPb23WL8LjMks6mU8ELGW8WsEfYoLT | future-trash, jackiepepe |
| 13eJnHaD25Ti1rZ58f5ZNStxDDRyVLJ3R6 | gmonthaloose, pepzuki, ponzi-comics |
| 144HfypzfqgAwf1KRJxBXDXQ9FyLPRY1XE | gold-kingdom, ren-rares, triple-mike |
| 17w9wi7kYPT51QcM9aQR5FxWgWPTYFmet4 | green-nudes, pepabstracts |
| 18PHGKzAcMDNVNie6kwDp2s6rkKM8RBcg2 | hip-hop-elements, nutmeg-prints |
| 155kE9fAsk6pJxU9TVV89UQSKC8WuwXY2S | holy-naka, pepe-kong |
| 1KacrYMuQW5eqLbrYUotQ1mdsVpxin6hC9 | honda-civic-variants, koko, pups |
| 1CKDZhRxSayuJUujQ7VeQ7xDCQTF8cE8or | honorary-nft, prphocknbhfts, squiggle-pepe |
| 15vHMiUEPwReuVmwhD3PyA15mCSQQu6k3n | imitations, nam-june-pepe |
| 1JBEzg8ZcQQiLwJtDgp6Q4ssNxexoYQx8N | journey-paint, no-memes-today |
| 1Hjxiv4qQn6d2BY5ZWXuKVeyJjTVH5iMoN | just-a-scratch, pepbot, pepebrick |
| 1L825gmhMUaJSYKXa8csefgffwveCUujTJ | kenergy, love-love-pepe |
| 15EFF1BFgjvAQmGd8b3o5eUToRvycMB75a | kevin-master-wizard, pizzalluminati, when-kevin-met-pepe |
| 1BLKYhhV6hf3YMV1SnGosyPWJPF3Juf5t7 | keycapepe, pepepixeland, phockbangers |
| 1G4CjzQzYJ2fty5RXc4U1LCrdKUrHtwxu5 | koa-the-cat, thirtyfirst |
| 1FxWCUK6QkdWxvv2GmkuhhEMHJHZ4BTnNW | kyc, pepecup, pepeniro, plebz, rare-dream, rare-vision, spooky-pepes |
| 17Xw41Zg2zxNV5DcCPQ28TdSVaAwk1SpdA | majonis-collection, rugspensers |
| bc1qvuggzmxeaht24fdqe6n7rcxv0kuew725g0skln | memestacks, mempepe |
| 13TjDyWFsQGsNXGxYKU5ewjTyYUMrFHvac | memestamp, ordinals-clock, stampsy |
| 1DJ64TSro9AmnV3RLZqBfnqtTFUUvmmWky | meow, punytokens |
| 1KekGtxJBMDpDLk5i6ShkgB311AVq8gtRd | mgsk8, rare-horse-agency |
| 1EwohKgs2zjjA9uQ6X7GRcyEhyXopuCeHk | moaa, progeny-beasts, punchpuff, xcpinata |
| 1F6Vyig9kBGc5Buvy9JyuV8d3jEiPKxWUX | mohini, psychforce |
| 13HHKVNFBrkfor66LPMbSfvDVNKvhPmSGH | oni-blade, pantherfive |
| 13BgJp11izDdYoZgvH9FWCoydaA7CCUkW7 | pepe-bratva, utility-cards |
| 15FPgnpZuNyZLVLsyB6UdFicsVvWFJXNve | pepe-mosaic, yachtypepe |
| 1MrFGy1MecMe73poEebVDrvomMxWzT6Swn | pepe-was-here, the-end-of-fiat |
| 1CkXN3VicpNeKKihQKHyqSik9J4JUmsnB4 | pepecartel, petty-cache |
| 1GotRejB6XsGgMsM79TvcypeanDJRJbMtg | phockheads-djpepe, punycodes, tset |
| 19DWf98733gjJkrqFcBkndoqy2PKuA6PWD | realfakek, sound-of-jpepe |
| 1LmTfavpcytyCub4wJjnFc97hvAp75ub8Z | shortfor, the-enigma |
| 1JHAGLjZjA9jxgcFbpwwix8dW8WRXq8K34 | spambird, wojakarmy |
