import { isCounterpartyAssetId } from "#lib/collection-source";

const SEARCH_URL = "https://kaleidoscopexcp.net/api/search";
const PAGE_SIZE = 60;
const MAX_PAGES = 100;
const CACHE_KEY = "kaleidoscope-search-v1";

// Kaleidoscope is intentionally inclusive. A more specific canonical set
// keeps primary ownership; the resolver turns that appearance here secondary.
export const overlapPolicy = "secondary";

function canonicalIdentity(value, path) {
  if (typeof value !== "string") throw new Error(`${path} must be a string`);
  const trimmed = value.trim();
  if (isCounterpartyAssetId(trimmed)) return trimmed;

  // Counterparty top-level named assets are uppercase. Kaleidoscope has a
  // small number of presentation-cased names; subasset casing remains exact.
  if (!trimmed.includes(".")) {
    const uppercase = trimmed.toUpperCase();
    if (isCounterpartyAssetId(uppercase)) return uppercase;
  }
  throw new Error(`${path} is not a Counterparty asset identifier`);
}

function parsePage(response, expectedPage, expectedTotal) {
  if (typeof response !== "object" || response === null || Array.isArray(response)) {
    throw new Error(`page ${expectedPage} response must be an object`);
  }
  if (response.page !== expectedPage) throw new Error(`page ${expectedPage} response has the wrong page`);
  if (response.pageSize !== PAGE_SIZE) {
    throw new Error(`page ${expectedPage} response pageSize must equal ${PAGE_SIZE}`);
  }
  if (!Number.isSafeInteger(response.total) || response.total < 1) {
    throw new Error(`page ${expectedPage} response total must be a positive integer`);
  }
  if (expectedTotal !== undefined && response.total !== expectedTotal) {
    throw new Error("Kaleidoscope total changed during pagination");
  }
  if (!Array.isArray(response.items)) throw new Error(`page ${expectedPage} items must be an array`);
  return response;
}

async function fetchAll(fetchJson) {
  const first = parsePage(
    await fetchJson(`${SEARCH_URL}?page=1&pageSize=${PAGE_SIZE}`, {
      timeoutMs: 20_000,
      maxBytes: 2_000_000,
      maxRedirects: 2,
    }),
    1,
  );
  const pages = Math.ceil(first.total / PAGE_SIZE);
  if (pages > MAX_PAGES) throw new Error(`Kaleidoscope exceeds the ${MAX_PAGES}-page safety bound`);

  const items = [...first.items];
  for (let page = 2; page <= pages; page += 1) {
    const response = parsePage(
      await fetchJson(`${SEARCH_URL}?page=${page}&pageSize=${PAGE_SIZE}`, {
        timeoutMs: 20_000,
        maxBytes: 2_000_000,
        maxRedirects: 2,
      }),
      page,
      first.total,
    );
    items.push(...response.items);
  }
  if (items.length !== first.total) {
    throw new Error(`Kaleidoscope returned ${items.length} of ${first.total} assets`);
  }
  return items;
}

export async function load({ fetchJson, cache }) {
  if (typeof fetchJson !== "function") throw new Error("adapter requires the injected fetchJson helper");
  if (!(cache instanceof Map)) throw new Error("adapter requires its per-export cache");
  let pending = cache.get(CACHE_KEY);
  if (pending === undefined) {
    pending = fetchAll(fetchJson);
    cache.set(CACHE_KEY, pending);
  }

  let items;
  try {
    items = await pending;
  } catch (error) {
    if (cache.get(CACHE_KEY) === pending) cache.delete(CACHE_KEY);
    throw error;
  }

  const ids = new Set();
  const assets = new Set();
  return items.map((item, index) => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      throw new Error(`items[${index}] must be an object`);
    }
    if (!Number.isSafeInteger(item.kaleidoscopeId) || item.kaleidoscopeId < 0) {
      throw new Error(`items[${index}].kaleidoscopeId must be a non-negative integer`);
    }
    if (ids.has(item.kaleidoscopeId)) {
      throw new Error(`items[${index}] duplicates Kaleidoscope ID ${item.kaleidoscopeId}`);
    }
    const asset = canonicalIdentity(item.assetName, `items[${index}].assetName`);
    if (assets.has(asset)) throw new Error(`items[${index}] duplicates asset ${asset}`);
    ids.add(item.kaleidoscopeId);
    assets.add(asset);
    return {
      asset,
      attributes: [{ trait_type: "Kaleidoscope ID", value: item.kaleidoscopeId }],
    };
  });
}
