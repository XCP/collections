import { isCounterpartyAssetId } from "#lib/collection-source";

export const PEPE_WTF_ASSET_URL = "https://api.pepe.wtf/api/asset";

const CONFIG_KEYS = new Set(["collection", "excluded_names", "secondary_assets"]);
const RESPONSE_CACHE_KEY = "pepe-wtf-v1";
const MAX_ROWS = 10_000;

function isPlainObject(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function trimmedString(value, label, maxLength = 250) {
  if (typeof value !== "string") throw new Error(`${label} must be a string`);
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) {
    throw new Error(`${label} must be non-empty and no longer than ${maxLength} characters`);
  }
  return trimmed;
}

function checkedStringSet(value, label, { assetIdentifiers = false } = {}) {
  if (value === undefined) return new Set();
  if (!Array.isArray(value)) throw new Error(`config.${label} must be an array`);

  const output = new Set();
  for (let index = 0; index < value.length; index += 1) {
    const item = trimmedString(value[index], `config.${label}[${index}]`);
    if (item !== value[index]) throw new Error(`config.${label}[${index}] must be trimmed`);
    if (assetIdentifiers && !isCounterpartyAssetId(item)) {
      throw new Error(`config.${label}[${index}] must be a Counterparty asset identifier`);
    }
    if (output.has(item)) throw new Error(`config.${label} must not contain duplicates`);
    output.add(item);
  }
  return output;
}

function checkedConfig(config = {}, collection) {
  if (!isPlainObject(config)) throw new Error("config must be an object");
  for (const key of Object.keys(config)) {
    if (!CONFIG_KEYS.has(key)) throw new Error(`unknown config key ${JSON.stringify(key)}`);
  }

  const configuredCollection = config.collection ?? collection;
  const collectionName = trimmedString(configuredCollection, "config.collection", 100);
  if (collectionName !== configuredCollection) throw new Error("config.collection must be trimmed");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(collectionName)) {
    throw new Error("config.collection must be the exact lowercase pepe.wtf collection slug");
  }

  return {
    collectionName,
    excludedNames: checkedStringSet(config.excluded_names, "excluded_names"),
    secondaryAssets: checkedStringSet(config.secondary_assets, "secondary_assets", {
      assetIdentifiers: true,
    }),
  };
}

function collectionUrl(collectionName) {
  const url = new URL(PEPE_WTF_ASSET_URL);
  url.searchParams.set("collection", collectionName);
  return url.href;
}

async function fetchCollection({ fetchJson, cache, collectionName }) {
  if (typeof fetchJson !== "function") {
    throw new Error("the adapter requires the injected fetchJson helper");
  }
  if (!(cache instanceof Map)) throw new Error("the adapter requires its per-export cache");

  let responses = cache.get(RESPONSE_CACHE_KEY);
  if (responses === undefined) {
    responses = new Map();
    cache.set(RESPONSE_CACHE_KEY, responses);
  }

  const url = collectionUrl(collectionName);
  let pending = responses.get(url);
  if (pending === undefined) {
    pending = fetchJson(url, {
      timeoutMs: 15_000,
      maxBytes: 2_000_000,
      maxRedirects: 2,
    });
    responses.set(url, pending);
  }

  try {
    return await pending;
  } catch (error) {
    if (responses.get(url) === pending) responses.delete(url);
    throw error;
  }
}

function checkedOptionalArtist(row, label) {
  if (!("artist" in row)) throw new Error(`${label}.artist is missing`);
  if (row.artist === null) return undefined;
  if (!isPlainObject(row.artist)) throw new Error(`${label}.artist must be an object or null`);
  return trimmedString(row.artist.name, `${label}.artist.name`, 1_000);
}

function checkedSeries(row, label) {
  if (!Number.isSafeInteger(row.serie) || row.serie < 0) {
    throw new Error(`${label}.serie must be a non-negative integer`);
  }
  return row.serie;
}

function checkedOptionalCard(row, label) {
  if (!("card" in row)) throw new Error(`${label}.card is missing`);
  if (row.card === null) return undefined;
  if (!Number.isSafeInteger(row.card) || row.card < 0) {
    throw new Error(`${label}.card must be a non-negative integer or null`);
  }
  return row.card;
}

export async function load({ collection, config = {}, fetchJson, cache }) {
  const { collectionName, excludedNames, secondaryAssets } = checkedConfig(config, collection);
  const response = await fetchCollection({ fetchJson, cache, collectionName });
  if (!Array.isArray(response)) throw new Error("pepe.wtf response must be an array");
  if (response.length === 0) return undefined;
  if (response.length > MAX_ROWS) {
    throw new Error(`pepe.wtf response exceeds the ${MAX_ROWS}-row limit`);
  }

  const seenNames = new Set();
  const seenExclusions = new Set();
  const seenAssets = new Set();
  const assets = [];
  let exactRows = 0;

  for (let index = 0; index < response.length; index += 1) {
    const row = response[index];
    const label = `pepe.wtf row ${index}`;
    if (!isPlainObject(row)) throw new Error(`${label} must be an object`);

    const sourceCollection = trimmedString(row.collection, `${label}.collection`, 100);
    if (sourceCollection !== row.collection) throw new Error(`${label}.collection must be trimmed`);
    if (sourceCollection !== collectionName) continue;
    exactRows += 1;

    const asset = trimmedString(row.name, `${label}.name`);
    if (seenNames.has(asset)) {
      throw new Error(`${collection}: pepe.wtf repeats name ${JSON.stringify(asset)}`);
    }
    seenNames.add(asset);

    if (excludedNames.has(asset)) {
      seenExclusions.add(asset);
      continue;
    }
    if (!isCounterpartyAssetId(asset)) {
      throw new Error(
        `${label}.name ${JSON.stringify(asset)} is not a Counterparty asset identifier; ` +
          "review the row and explicitly exclude it only if it is not a collection member",
      );
    }
    if (seenAssets.has(asset)) throw new Error(`${collection}: pepe.wtf repeats asset ${asset}`);
    seenAssets.add(asset);

    const artist = checkedOptionalArtist(row, label);
    const series = checkedSeries(row, label);
    const card = checkedOptionalCard(row, label);
    const attributes = [];
    if (artist !== undefined) attributes.push({ trait_type: "Artist", value: artist });
    attributes.push({ trait_type: "Series", value: series });
    if (card !== undefined) attributes.push({ trait_type: "Card", value: card });

    assets.push({
      asset,
      ...(secondaryAssets.has(asset) ? { secondary: true } : {}),
      attributes,
    });
  }

  if (exactRows === 0) return undefined;

  const staleExclusions = [...excludedNames].filter((name) => !seenExclusions.has(name));
  if (staleExclusions.length > 0) {
    throw new Error(
      `${collection}: configured excluded names are absent from ${JSON.stringify(collectionName)}: ` +
        staleExclusions.join(", "),
    );
  }
  const missingSecondary = [...secondaryAssets].filter((asset) => !seenAssets.has(asset));
  if (missingSecondary.length > 0) {
    throw new Error(
      `${collection}: configured secondary assets are absent from ${JSON.stringify(collectionName)}: ` +
        missingSecondary.join(", "),
    );
  }
  if (assets.length === 0) {
    throw new Error(`${collection}: ${JSON.stringify(collectionName)} has no included Counterparty assets`);
  }
  return assets;
}
