import { isCounterpartyAssetId } from "#lib/collection-source";

const BASE_URL = "https://api.orbital.market";
const PAGE_SIZE = 500;
const MAX_ASSETS = 25_000;
const CACHE_PREFIX = "orbital-collection-v1:";

function pageUrl(collection, skip) {
  const url = new URL("/orbs", BASE_URL);
  url.searchParams.set("$limit", String(PAGE_SIZE));
  url.searchParams.set("$skip", String(skip));
  url.searchParams.set("collection", collection);
  return url.href;
}

function normalizedAttributes(value, path) {
  if (Array.isArray(value) && value.length === 0) return undefined;
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${path} must be an object or an empty array`);
  }
  const attributes = [];
  for (const traitType of Object.keys(value).sort((left, right) => left.localeCompare(right, "en"))) {
    const traitValue = value[traitType];
    if (typeof traitValue === "string" && traitValue.trim().length > 0) {
      attributes.push({ trait_type: traitType, value: traitValue.trim() });
    } else if (typeof traitValue === "number" && Number.isFinite(traitValue)) {
      attributes.push({ trait_type: traitType, value: traitValue });
    }
  }
  return attributes.length > 0 ? attributes : undefined;
}

function parsePage(response, collection, expectedSkip, expectedTotal) {
  if (typeof response !== "object" || response === null || Array.isArray(response)) {
    throw new Error(`${collection}: page at skip ${expectedSkip} must be an object`);
  }
  if (!Number.isSafeInteger(response.total) || response.total < 1) {
    throw new Error(`${collection}: total must be a positive integer`);
  }
  if (response.total > MAX_ASSETS) {
    throw new Error(`${collection}: ${response.total} assets exceed the ${MAX_ASSETS}-asset safety bound`);
  }
  if (expectedTotal !== undefined && response.total !== expectedTotal) {
    throw new Error(`${collection}: total changed during pagination`);
  }
  if (response.limit !== PAGE_SIZE || response.skip !== expectedSkip) {
    throw new Error(`${collection}: pagination echo does not match the request`);
  }
  if (!Array.isArray(response.data)) throw new Error(`${collection}: data must be an array`);
  return response;
}

async function loadCollection({ collection, fetchJson }) {
  const descriptorUrl = `${BASE_URL}/collections/${encodeURIComponent(collection)}`;
  let descriptor;
  try {
    descriptor = await fetchJson(descriptorUrl, {
      timeoutMs: 15_000,
      maxBytes: 1_000_000,
      maxRedirects: 2,
    });
  } catch (error) {
    if (error?.status === 404) return undefined;
    throw error;
  }
  if (typeof descriptor !== "object" || descriptor === null || descriptor.slug !== collection) {
    throw new Error(`${collection}: collection descriptor slug mismatch`);
  }

  const first = parsePage(
    await fetchJson(pageUrl(collection, 0), {
      timeoutMs: 20_000,
      maxBytes: 5_000_000,
      maxRedirects: 2,
    }),
    collection,
    0,
  );
  const rows = [...first.data];
  for (let skip = PAGE_SIZE; skip < first.total; skip += PAGE_SIZE) {
    const page = parsePage(
      await fetchJson(pageUrl(collection, skip), {
        timeoutMs: 20_000,
        maxBytes: 5_000_000,
        maxRedirects: 2,
      }),
      collection,
      skip,
      first.total,
    );
    rows.push(...page.data);
  }
  if (rows.length !== first.total) {
    throw new Error(`${collection}: returned ${rows.length} of ${first.total} assets`);
  }

  const seen = new Set();
  return rows.map((row, index) => {
    if (typeof row !== "object" || row === null || Array.isArray(row)) {
      throw new Error(`${collection}: data[${index}] must be an object`);
    }
    if (row.collection !== collection) {
      throw new Error(`${collection}: data[${index}] belongs to ${JSON.stringify(row.collection)}`);
    }
    if (!isCounterpartyAssetId(row.token)) {
      throw new Error(`${collection}: data[${index}].token is not a Counterparty asset identifier`);
    }
    if (seen.has(row.token)) throw new Error(`${collection}: duplicate asset ${row.token}`);
    seen.add(row.token);
    const attributes = normalizedAttributes(row.attributes, `${collection}: data[${index}].attributes`);
    return { asset: row.token, ...(attributes ? { attributes } : {}) };
  });
}

export async function load({ collection, fetchJson, cache }) {
  if (typeof fetchJson !== "function") throw new Error("adapter requires the injected fetchJson helper");
  if (!(cache instanceof Map)) throw new Error("adapter requires its per-export cache");
  const key = `${CACHE_PREFIX}${collection}`;
  let pending = cache.get(key);
  if (pending === undefined) {
    pending = loadCollection({ collection, fetchJson });
    cache.set(key, pending);
  }
  try {
    return await pending;
  } catch (error) {
    if (cache.get(key) === pending) cache.delete(key);
    throw error;
  }
}
