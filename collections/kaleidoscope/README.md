# Kaleidoscope

<!-- collection-facts:start -->
## Registry facts

| Field | Value |
| --- | --- |
| Type | Canonical collection |
| Membership | 2,110 assets |
| Primary memberships | 1,656 |
| Secondary or curated memberships | 454 |
| Source | Collection-operated `adapter.ts` |
| Traits | Art year: 38/2,110 (1.8%)<br>Artist: 771/2,110 (36.5%)<br>Based on: 2/2,110 (0.1%)<br>Kaleidoscope ID: 2,110/2,110 (100%) |
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

LOOKSRARE is credited to M0d3d3b0 from its [exact-asset original metadata](https://xcp.coindaddy.io/LOOKSRARE.json), whose published attribution field names M0d3D3b0. Its reviewed preview matches the described artwork. This is published attribution evidence, not cryptographic signature verification. Membership is unchanged.

BITSAMURAI is credited to BTC Monk: the [artist auction listing](https://scarce.city/auctions/bitsamurai) explicitly identifies the associated BITSAMURAI token. Existing membership and other traits are retained.

Reviewed individual artist credits from exact-asset original metadata:

- BLOCKVII: **pitoopi**, from the [original metadata](https://api.npoint.io/10d18fc7d8c20189c557.json) attribution field ("@PitooPi").
- PEPESTATION: **pitoopi**, from the [original metadata](https://api.npoint.io/f9119d99297d02bf1788.json) attribution field ("PitooPi").
- MINDBENDERS.METABALLS.001: **mellow**, from the [original metadata](https://xcp.coindaddy.io/MINDBENDERS.METABALLS.001.json) attribution field ("mellow.").
- MINDBENDERS.METABALLS.002: **mellow**, from the [original metadata](https://xcp.coindaddy.io/MINDBENDERS.METABALLS.002.json) attribution field ("mellow.").
- MINDBENDERS.METABALLS.003: **mellow**, from the [original metadata](https://xcp.coindaddy.io/MINDBENDERS.METABALLS.003.json) attribution field ("mellow.").
- MINDBENDERS.SPHERE.001: **mellow**, from the [original metadata](https://xcp.coindaddy.io/MINDBENDERS.SPHERE.001.json) attribution field ("mellow.").

These are published creator attributions, not cryptographic signature verification. Existing collection membership and other traits are retained.

Reviewed individual artist credits from exact-asset original metadata:

- TRUMPED: **Waldemar**, from the [original metadata](https://arweave.net/6A5tJ7WXbf2jMcJd4FCYvO-uwOyaiPxT7TJUJCerNLs) attribution field ("WALLY").

These are published creator attributions, not cryptographic signature verification. Existing collection membership and other traits are retained.
TRUMPED's WALLY label is associated with the same Wrbpt26 social handle already documented for Waldemar. The exact-asset metadata and matching established handle support this individual credit; this does not establish a general WALLY alias.

## Reviewed artist chronology

TRUMPED carries Art year 2023 from its March 2023 exact-work metadata attachment and subsequent supply lock; its 2022 reservation does not establish artwork use. TMDAUTOGRAPH carries 2021 from its artwork-bearing initial description, edition expansion and lock in October 2021. These reviewed traits survive API refreshes without adding membership. See the [complete artist date coverage report](../../docs/artist-date-coverage-2026-10-13.md).

## JP Janssen (JPJA)

Credit the existing JPJA and OLGA entries to **JP Janssen**, using his [first-person project history](https://jpjanssen.com/jpja-2014-book-nft-defi-pioneer/) and [OLGA FAQ](https://jpjanssen.com/faq-about-olga/). These are direct authorship statements, not attribution from a shared issuer. His [website](https://jpjanssen.com/), [GitHub](https://github.com/Jpja) and [social account](https://twitter.com/jp_janssen) are linked by his own site.

JPJA receives Art year **2014**: its [valid June 28, 2014 description](https://api.xcp.io/v2/assets/JPJA/issuances?limit=100) explicitly links the token to eBook tips and JPJA.net, corroborating the author's book account. This dates the book project, not a later cover image or a claim of worldwide NFT priority.

OLGA receives Art year **2015**, distinct from its 2014 token registration and original symbolic dedication. The artist identifies the image's August 11, 2015 on-chain encoding and publishes [reconstruction instructions](https://jpjanssen.com/how-to-extract-olgas-image-from-the-blockchain/) for transaction [627ae48d6b4cffb2ea734be1016dedef4cee3f8ffefaea5602dd58c696de6b74](https://blockstream.info/tx/627ae48d6b4cffb2ea734be1016dedef4cee3f8ffefaea5602dd58c696de6b74). Artwork recorded separately from the asset description still supports attribution. The site's book article has an inconsistent OLGA subsection date; the dedicated FAQ explicitly separates 2014 registration and 2015 image attachment.

The artist's OG year is therefore supported by the 2014 book project. Membership refreshes retain both credits and dates; no new membership or derivative attribution is inferred.

## SALVATION and RETARDPEPE

Credit both existing entries to **JP Janssen**. His [SALVATION account](https://jpjanssen.com/salvation/) and [asset shop](https://jpjanssen.com/shop/) explicitly claim these formerly anonymous projects. His [Vintage Tokens evidence archive](https://www.dropbox.com/s/c97ytaq95c6or0k/JP_VINTAGE_TOKENS.zip?dl=0), linked from [his preservation article](https://jpjanssen.com/back-up-your-bitcoin-nfts/), includes separate authorship notes, original media and forum screenshots. Attribution is to the token project and creative assembly, not authorship of a pre-existing religious icon or the Pepe character.

- **SALVATION: Art year 2015** dates the original participatory joke, supported by the August 4 issuance of seven tokens with its explicit salvation description and the [August 2015 Reddit announcement](https://www.reddit.com/r/counterparty_xcp/comments/3fywf3/salvation_was_revealed_to_me_jdog_and_derose_got/). This was actual project use, not a reserved name. The public-domain religious icon was added in **2017**, as JP explicitly explains; the 2015 project date must not be described as the image attachment date.
- **RETARDPEPE: Art year 2017** dates the original named, issued and locked 100-card project on June 4, corroborated by the archive's June 2017 forum records and creator account. The current animated GIF combines three earlier rejected submissions and was assembled in **2021**. The archive's animated GIF MD5 begins AF7330FC3, matching the value in the July 2021 description (which labels it MP5). This is not an official Rare Pepe Directory entry: the creator explicitly documents rejection. Existing Kaleidoscope membership remains unchanged.

The [SALVATION issuance history](https://api.xcp.io/v2/assets/SALVATION/issuances?limit=100) and [RETARDPEPE issuance history](https://api.xcp.io/v2/assets/RETARDPEPE/issuances?limit=100) corroborate the project dates; they are not the sole basis for authorship.
