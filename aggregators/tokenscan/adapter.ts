const TOKENSCAN_PROJECT_BASE_URL = "https://tokenscan.io/explorer/project";
const CACHE_KEY = "tokenscan-project-runtime-v1";
const CONFIG_KEYS = new Set(["project", "secondary_assets"]);
const PROJECT_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const MAX_ATTEMPTS = 7;
// TokenScan's project API is deliberately conservative around burst traffic.
// Leave generous headroom below the observed provider limit so overlapping CI
// runs do not turn 429 retries into the normal happy path.
const MIN_REQUEST_INTERVAL_MS = 2_000;
const BASE_RETRY_DELAY_MS = 500;
const MAX_RETRY_DELAY_MS = 60_000;

function isPlainObject(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function checkedConfig(config = {}, collection) {
  if (!isPlainObject(config)) throw new Error("config must be an object");
  for (const key of Object.keys(config)) {
    if (!CONFIG_KEYS.has(key)) throw new Error(`unknown config key ${JSON.stringify(key)}`);
  }
  const project = config.project ?? collection;
  if (typeof project !== "string" || !PROJECT_SLUG.test(project)) {
    throw new Error("config.project must be an exact lowercase Tokenscan project slug");
  }

  const secondaryAssets = config.secondary_assets ?? [];
  if (
    !Array.isArray(secondaryAssets) ||
    !secondaryAssets.every(
      (asset) => typeof asset === "string" && asset.length > 0 && asset === asset.trim(),
    )
  ) {
    throw new Error("config.secondary_assets must be an array of non-empty, trimmed asset identifiers");
  }
  if (new Set(secondaryAssets).size !== secondaryAssets.length) {
    throw new Error("config.secondary_assets must not contain duplicates");
  }
  return { project, secondaryAssets: new Set(secondaryAssets) };
}

function identityFromTuple(tuple, index) {
  if (!Array.isArray(tuple) || tuple.length !== 6) {
    throw new Error(`Tokenscan project data[${index}] must be a six-field tuple`);
  }
  if (!Number.isSafeInteger(tuple[0]) || tuple[0] < 0) {
    throw new Error(`Tokenscan project data[${index}][0] must be a non-negative integer row ID`);
  }
  if (typeof tuple[1] !== "string") {
    throw new Error(`Tokenscan project data[${index}][1] must be an asset identity string`);
  }

  const separator = tuple[1].indexOf("|");
  if (separator <= 0 || separator !== tuple[1].lastIndexOf("|")) {
    throw new Error(`Tokenscan project data[${index}][1] must be "asset|asset_longname"`);
  }
  const compact = tuple[1].slice(0, separator);
  const longname = tuple[1].slice(separator + 1);
  if (!compact || compact !== compact.trim() || longname !== longname.trim()) {
    throw new Error(`Tokenscan project data[${index}][1] contains an invalid asset identity`);
  }
  return { compact, asset: longname || compact };
}

export function parseTokenscanProject(response, expectedProject) {
  if (!isPlainObject(response)) throw new Error("Tokenscan project response must be an object");
  if (response.success !== true) throw new Error("Tokenscan project response success must be true");
  if (!isPlainObject(response.project) || response.project.slug !== expectedProject) {
    throw new Error(`Tokenscan project response slug must exactly equal ${JSON.stringify(expectedProject)}`);
  }
  if (!Array.isArray(response.data)) throw new Error("Tokenscan project response data must be an array");
  if (!Number.isSafeInteger(response.recordsTotal) || response.recordsTotal < 0) {
    throw new Error("Tokenscan project recordsTotal must be a non-negative integer");
  }
  if (!Number.isSafeInteger(response.recordsFiltered) || response.recordsFiltered < 0) {
    throw new Error("Tokenscan project recordsFiltered must be a non-negative integer");
  }
  if (
    response.recordsTotal !== response.recordsFiltered ||
    response.recordsTotal !== response.data.length
  ) {
    throw new Error("Tokenscan project recordsTotal, recordsFiltered, and data length must match");
  }

  const seenCompacts = new Set();
  const seenAssets = new Set();
  const assets = [];
  for (const [index, tuple] of response.data.entries()) {
    const { compact, asset } = identityFromTuple(tuple, index);
    if (seenAssets.has(asset)) {
      throw new Error(`Tokenscan project data[${index}] duplicates asset ${JSON.stringify(asset)}`);
    }
    if (seenCompacts.has(compact)) {
      throw new Error(
        `Tokenscan project data[${index}] duplicates compact asset identity ${JSON.stringify(compact)}`,
      );
    }
    seenCompacts.add(compact);
    seenAssets.add(asset);
    assets.push(asset);
  }
  if (assets.length === 0) throw new Error(`${JSON.stringify(expectedProject)} has no project assets`);
  return assets;
}

function wait(delayMs) {
  return delayMs > 0 ? new Promise((resolve) => setTimeout(resolve, delayMs)) : Promise.resolve();
}

function retryDelay(error, attempt) {
  const status = error?.status;
  if (status !== 429 && !(Number.isInteger(status) && status >= 500 && status <= 599)) return undefined;
  const exponential = BASE_RETRY_DELAY_MS * 2 ** attempt;
  const requested = Number.isFinite(error.retryAfterMs) ? error.retryAfterMs : 0;
  return Math.min(MAX_RETRY_DELAY_MS, Math.max(exponential, requested));
}

async function fetchWithRetry(fetchJson, state, url) {
  let lastError;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const throttleDelay = Math.max(0, state.nextRequestAt - Date.now());
    await wait(throttleDelay);
    state.nextRequestAt = Date.now() + MIN_REQUEST_INTERVAL_MS;

    try {
      return await fetchJson(url, {
        timeoutMs: 20_000,
        maxBytes: 2_000_000,
        maxRedirects: 2,
      });
    } catch (error) {
      lastError = error;
      const delay = retryDelay(error, attempt);
      if (delay === undefined || attempt === MAX_ATTEMPTS - 1) throw error;
      await wait(delay);
    }
  }
  throw lastError;
}

function runtimeFrom(cache) {
  if (!(cache instanceof Map)) throw new Error("the adapter requires its per-export cache");
  let state = cache.get(CACHE_KEY);
  if (state === undefined) {
    state = { queue: Promise.resolve(), nextRequestAt: 0, responses: new Map() };
    cache.set(CACHE_KEY, state);
  }
  return state;
}

async function loadResponse({ fetchJson, cache, project }) {
  if (typeof fetchJson !== "function") throw new Error("the adapter requires the injected fetchJson helper");
  const state = runtimeFrom(cache);
  const url = `${TOKENSCAN_PROJECT_BASE_URL}/${encodeURIComponent(project)}?start=0&length=5000`;
  let pending = state.responses.get(url);
  if (pending === undefined) {
    const request = () => fetchWithRetry(fetchJson, state, url);
    pending = state.queue.then(request, request);
    state.queue = pending.catch(() => undefined);
    state.responses.set(url, pending);
  }
  try {
    return await pending;
  } catch (error) {
    if (state.responses.get(url) === pending) state.responses.delete(url);
    throw error;
  }
}

export async function load({ collection, config = {}, fetchJson, cache }) {
  const { project, secondaryAssets } = checkedConfig(config, collection);
  let response;
  try {
    response = await loadResponse({ fetchJson, cache, project });
  } catch (error) {
    if (error?.status === 404) return undefined;
    throw error;
  }
  const identities = parseTokenscanProject(response, project);
  const present = new Set(identities);

  const missingSecondary = [...secondaryAssets].filter((asset) => !present.has(asset));
  if (missingSecondary.length > 0) {
    throw new Error(
      `${collection}: configured secondary assets are absent from ${JSON.stringify(project)}: ` +
        missingSecondary.join(", "),
    );
  }
  return identities.map((asset) => ({
    asset,
    ...(secondaryAssets.has(asset) ? { primary: false } : {}),
  }));
}
