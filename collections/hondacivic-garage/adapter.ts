import { isCounterpartyAssetId } from "#lib/collection-source";

// The garage's own mint API lists every pulled card with the traits committed
// (and inscribed) at mint. It is the authority for which slots hold a card:
// Counterparty also carries pre-registered, still-empty slots (supply 0) and
// unrelated HONDACIVIC subassets, so the chain's subasset list is not a
// membership list.
const MINT_URL = "https://milliondollarbillboard.net/api/garage/mint";
const MAX_CARDS = 2_500;
const CARD_ID = /^HONDACIVIC\.S(\d{1,4})\.(\d{4,6}|CHAMPION)$/;

// Replaced by the integer Series/Card traits derived from the card identity,
// or a chain fact consumers derive themselves.
const DERIVED_TRAITS = new Set(["Season", "Mint number", "Minted at block"]);

function objectAt(value, path) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${path} must be an object`);
  }
  return value;
}

function countAt(value, path) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${path} must be a non-negative integer`);
  return value;
}

function traitsOf(card, path, season, number) {
  const attributes = [
    { trait_type: "Series", value: season },
    ...(number === null ? [] : [{ trait_type: "Card", value: number }]),
  ];
  // Since October 2026 gallery cards carry their headline fields instead of the
  // full attribute list (which stays on the per-card endpoint). Keep the stable
  // ones; never fail the registry over a missing optional trait list.
  if (card.attributes === undefined) {
    for (const [traitType, value] of [["Car", card.car], ["Tier", card.tier_label]]) {
      if (typeof value === "string" && value.trim() !== "") attributes.push({ trait_type: traitType, value: value.trim() });
    }
    return attributes;
  }
  if (!Array.isArray(card.attributes)) throw new Error(`${path}.attributes must be an array`);
  const seen = new Set();
  card.attributes.forEach((attribute, index) => {
    const at = `${path}.attributes[${index}]`;
    objectAt(attribute, at);
    if (typeof attribute.trait_type !== "string" || attribute.trait_type.trim() === "") {
      throw new Error(`${at}.trait_type must be a non-empty string`);
    }
    if (typeof attribute.value !== "string" || attribute.value.trim() === "") {
      throw new Error(`${at}.value must be a non-empty string`);
    }
    const traitType = attribute.trait_type.trim();
    const value = attribute.value.trim();
    if (traitType === "Season" && value !== String(season)) {
      throw new Error(`${at} Season ${value} disagrees with the card identity`);
    }
    if (traitType === "Mint number" && value !== `#${number}`) {
      throw new Error(`${at} Mint number ${value} disagrees with the card identity`);
    }
    if (DERIVED_TRAITS.has(traitType)) return;
    // An exact repeat carries no information and the registry rejects it.
    const key = `${traitType}\0${value}`;
    if (seen.has(key)) return;
    seen.add(key);
    attributes.push({ trait_type: traitType, value });
  });
  return attributes;
}

export async function load({ fetchJson }) {
  if (typeof fetchJson !== "function") throw new Error("adapter requires the injected fetchJson helper");
  const options = { timeoutMs: 20_000, maxBytes: 10_000_000, maxRedirects: 2 };
  const current = objectAt(await fetchJson(MINT_URL, options), "response");
  const rules = objectAt(current.rules, "response.rules");
  if (!Array.isArray(rules.edition_seasons) || rules.edition_seasons.length === 0 || rules.edition_seasons.length > 100) {
    throw new Error("response.rules.edition_seasons must contain 1–100 seasons");
  }
  const seasons = [...new Set(rules.edition_seasons.map((v, i) => countAt(v, `edition_seasons[${i}]`)))];
  const assets = [];
  for (const season of seasons) {
    const response = objectAt(await fetchJson(`${MINT_URL}?season=${season}`, options), "response");
    if (response.season !== season) throw new Error(`requested season ${season}, received ${response.season}`);
    const entries = parseSeason(response);
    if (entries.some((entry) => entry.season !== season)) throw new Error(`gallery contains cards outside season ${season}`);
    assets.push(...entries);
    if (assets.length > MAX_CARDS) throw new Error(`all seasons exceed ${MAX_CARDS} cards`);
  }
  return assets.sort((a, b) => a.season - b.season || (a.number ?? 0) - (b.number ?? 0))
    .map(({ asset, attributes }) => ({ asset, attributes }));
}

function parseSeason(response) {
  const rules = objectAt(response.rules, "response.rules");
  if (rules.asset !== "HONDACIVIC") throw new Error("response.rules.asset must be HONDACIVIC");
  if (!Array.isArray(rules.edition_seasons) || rules.edition_seasons.length === 0) {
    throw new Error("response.rules.edition_seasons must be a non-empty array");
  }
  const seasons = new Set(
    rules.edition_seasons.map((value, index) => countAt(value, `response.rules.edition_seasons[${index}]`)),
  );

  const stats = objectAt(response.stats, "response.stats");
  const pulled = countAt(stats.pulled, "response.stats.pulled");
  const delivered = countAt(stats.delivered, "response.stats.delivered");
  if (!Array.isArray(response.gallery)) throw new Error("response.gallery must be an array");
  if (response.gallery.length > MAX_CARDS) throw new Error(`gallery exceeds the ${MAX_CARDS}-card safety bound`);
  if (response.gallery.length !== pulled) {
    throw new Error(`gallery lists ${response.gallery.length} of ${pulled} pulled cards`);
  }

  const assets = [];
  const seen = new Set();
  response.gallery.forEach((value, index) => {
    const path = `gallery[${index}]`;
    const card = objectAt(value, path);
    if (typeof card.asset !== "string") throw new Error(`${path}.asset must be a string`);
    const match = CARD_ID.exec(card.asset);
    if (match === null || !isCounterpartyAssetId(card.asset)) {
      throw new Error(`${path}.asset ${card.asset} is not a HONDACIVIC.S<season>.<number> card`);
    }
    const cardSeason = Number(match[1]);
    const number = match[2] === "CHAMPION" ? null : Number(match[2]);
    if (number === null && card.champion !== true) throw new Error(`${path} champion identity requires champion flag`);
    // The card name carries its season; the API's own season field is optional
    // (it was dropped from gallery cards in October 2026) but must agree if sent.
    if (card.season !== undefined && card.season !== cardSeason) {
      throw new Error(`${path}.season disagrees with ${card.asset}`);
    }
    if (card.mint_no !== (number ?? 0)) throw new Error(`${path}.mint_no disagrees with ${card.asset}`);
    if (seen.has(card.asset)) throw new Error(`${path} duplicates ${card.asset}`);
    seen.add(card.asset);
    if (typeof card.status !== "string") throw new Error(`${path}.status must be a string`);
    // A pulled card exists on Counterparty only once it is delivered.
    if (card.status !== "delivered") return;
    if (!seasons.has(cardSeason)) {
      throw new Error(`${path} season ${cardSeason} is not in response.rules.edition_seasons`);
    }
    assets.push({ asset: card.asset, attributes: traitsOf(card, path, cardSeason, number), season: cardSeason, number });
  });
  if (assets.length !== delivered) {
    throw new Error(`gallery has ${assets.length} delivered cards, stats report ${delivered}`);
  }

  return assets;
}
