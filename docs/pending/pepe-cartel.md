# Pending: Pepe Cartel (pepecartel.ar.io)

Draft placeholder so this is not forgotten. Not ready to merge.

**Live already:** Bootleg Pepe (201), Pepe Model P (200) and BitQuest (3) as collections, and 471 Pepe Cartel works in `counterparty`, all with Artist "Pepe Cartel" and CDN art (registry #32).

**What is pending:** about 10,000 supply-10 assets minted in 2026 by nine bc1q addresses, plus the 2025 batches from 1ENEJSco… and 1Q62kisA…, and about 1,997 BITQUEST subassets. Their descriptions point at `https://pepecartel.ar.io/c/<ASSET>.json`, but that metadata returns 404 on pepecartel.ar.io, arweave.net and ar-io.dev, so no art exists yet. pepecartel.net (2021–24) no longer resolves.

**Plan:** replace the static lists with a registry adapter, as HONDACIVIC Garage does:
- read every asset whose description points at pepecartel.ar.io (or historically pepecartel.net), plus the BOOTLEGPEPE and BITQUEST families;
- route by the metadata `category`: Bootleg Pepe, Pepe Model P and BitQuest to their collections; Frogs, Rares and the rest to `counterparty`, with Artist "Pepe Cartel";
- include an asset only once its metadata resolves and the CDN has its art.

**Source:** the discovery audit of 2026-10-08 (`pepecartel_classified.json`).
