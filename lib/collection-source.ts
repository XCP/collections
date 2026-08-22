import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { createFetchJson, createFetchText } from "#lib/safe-fetch";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const NAMED_ASSET = /^[B-Z][A-Z]{3,11}$/;
const NUMERIC_ASSET = /^A\d{17,20}$/;
const SUBASSET_LONGNAME = /^(?:[B-Z][A-Z]{3,11}|A\d{17,20})\.[A-Za-z0-9_@!-]+(?:\.[A-Za-z0-9_@!-]+)*$/;
const PROVIDER_NAME = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;
const KINDS = new Set(["canonical", "curated"]);
const META_KEYS = new Set(["name", "kind", "description", "links"]);
const ASSETS_FILE_KEYS = new Set(["assets"]);
const PROTOCOL_FILE_KEYS = new Set(["protocol"]);
const ENTRY_KEYS = new Set(["asset", "secondary", "attributes"]);
const ATTRIBUTE_KEYS = new Set(["trait_type", "value"]);
const LINK_KEYS = new Set(["website", "x", "discord"]);
const WHERE_KEYS = new Set([
  "issued_before_block",
  "issued_after_block",
  "collection_in",
  "issuer_in",
  "trait",
]);
const MIN_NUMERIC_ASSET = 26n ** 12n + 1n;
const MAX_NUMERIC_ASSET = 2n ** 64n - 1n;
const SECONDARY_ON_OVERLAP = Symbol("secondary-on-overlap");

export class CollectionValidationError extends Error {
  constructor(issues) {
    const list = Array.isArray(issues) ? issues : [issues];
    super(list.join("\n"));
    this.name = "CollectionValidationError";
    this.issues = list;
  }
}

function fail(path, message) {
  throw new CollectionValidationError(`${path}: ${message}`);
}

function isPlainObject(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function objectAt(value, path) {
  if (!isPlainObject(value)) fail(path, "must be an object");
  return value;
}

function exactKeys(value, allowed, path) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) fail(path, `unknown key ${JSON.stringify(key)}`);
  }
}

function nonemptyString(value, path, maxLength = 1_000) {
  if (typeof value !== "string" || value.length === 0 || value.length > maxLength || value !== value.trim()) {
    fail(path, `must be a non-empty, trimmed string no longer than ${maxLength} characters`);
  }
  return value;
}

export function isCounterpartyAssetId(value) {
  if (typeof value !== "string" || value.length > 250) return false;
  if (NAMED_ASSET.test(value)) return true;
  if (NUMERIC_ASSET.test(value)) {
    const number = BigInt(value.slice(1));
    return number >= MIN_NUMERIC_ASSET && number <= MAX_NUMERIC_ASSET;
  }
  if (!SUBASSET_LONGNAME.test(value)) return false;
  const parent = value.slice(0, value.indexOf("."));
  if (!parent.startsWith("A")) return true;
  const number = BigInt(parent.slice(1));
  return number >= MIN_NUMERIC_ASSET && number <= MAX_NUMERIC_ASSET;
}

function normalizedAttribute(value, path) {
  const attribute = objectAt(value, path);
  exactKeys(attribute, ATTRIBUTE_KEYS, path);
  const traitType = nonemptyString(attribute.trait_type, `${path}.trait_type`, 100);
  if (typeof attribute.value !== "string" && typeof attribute.value !== "number") {
    fail(`${path}.value`, "must be a string or number");
  }
  if (typeof attribute.value === "number" && !Number.isFinite(attribute.value)) {
    fail(`${path}.value`, "must be finite");
  }
  if (typeof attribute.value === "string") nonemptyString(attribute.value, `${path}.value`, 1_000);
  return { trait_type: traitType, value: attribute.value };
}

export function normalizeAssets(value, path = "assets") {
  if (!Array.isArray(value) || value.length === 0) fail(path, "must be a non-empty array");

  const seen = new Set();
  const assets = value.map((input, index) => {
    const entryPath = `${path}[${index}]`;
    const entry = objectAt(input, entryPath);
    exactKeys(entry, ENTRY_KEYS, entryPath);
    if (!isCounterpartyAssetId(entry.asset)) {
      fail(`${entryPath}.asset`, "must be a valid named, numeric, or subasset Counterparty identifier");
    }
    if (seen.has(entry.asset)) fail(`${entryPath}.asset`, `duplicates ${entry.asset}`);
    seen.add(entry.asset);

    if (entry.secondary !== undefined && typeof entry.secondary !== "boolean") {
      fail(`${entryPath}.secondary`, "must be a boolean");
    }
    if (entry.attributes !== undefined && !Array.isArray(entry.attributes)) {
      fail(`${entryPath}.attributes`, "must be an array");
    }

    const normalized = { asset: entry.asset };
    if (entry.secondary === true) normalized.secondary = true;
    if (entry.attributes?.length > 0) {
      normalized.attributes = entry.attributes.map((attribute, attributeIndex) =>
        normalizedAttribute(attribute, `${entryPath}.attributes[${attributeIndex}]`),
      );
      const seenAttributes = new Set();
      for (let attributeIndex = 0; attributeIndex < normalized.attributes.length; attributeIndex += 1) {
        const attribute = normalized.attributes[attributeIndex];
        const identity = `${attribute.trait_type}\0${typeof attribute.value}\0${JSON.stringify(attribute.value)}`;
        if (seenAttributes.has(identity)) {
          fail(`${entryPath}.attributes[${attributeIndex}]`, "duplicates an earlier attribute");
        }
        seenAttributes.add(identity);
      }
    }
    return normalized;
  });

  // Array order is deliberate editorial data (including repeated Artist
  // ordering), so deterministic exports preserve it byte-for-byte.
  return assets;
}

function requireCanonicalPrimary(kind, assets, path) {
  if (kind === "canonical" && !assets.some((entry) => entry.secondary !== true)) {
    fail(path, "a canonical collection must contain at least one unflagged primary asset");
  }
}

function normalizeLinks(value, path) {
  const links = objectAt(value, path);
  exactKeys(links, LINK_KEYS, path);
  const entries = Object.keys(links)
    .sort()
    .map((key) => {
      const text = nonemptyString(links[key], `${path}.${key}`, 2_048);
      let url;
      try {
        url = new URL(text);
      } catch {
        fail(`${path}.${key}`, "must be an absolute URL");
      }
      if (!new Set(["https:", "http:"]).has(url.protocol)) fail(`${path}.${key}`, "must use HTTP or HTTPS");
      if (url.username || url.password) fail(`${path}.${key}`, "must not include URL credentials");
      return [key, url.href];
    });
  return Object.fromEntries(entries);
}

function stringArray(value, path, { slugs = false } = {}) {
  if (!Array.isArray(value) || value.length === 0) fail(path, "must be a non-empty array");
  const seen = new Set();
  const output = value.map((item, index) => {
    const text = nonemptyString(item, `${path}[${index}]`, 250);
    if (slugs && !SLUG.test(text)) fail(`${path}[${index}]`, "must be a kebab-case collection slug");
    if (seen.has(text)) fail(`${path}[${index}]`, `duplicates ${JSON.stringify(text)}`);
    seen.add(text);
    return text;
  });
  return output.sort((left, right) => left.localeCompare(right, "en"));
}

export function normalizeWhere(value, path = "where") {
  const where = objectAt(value, path);
  exactKeys(where, WHERE_KEYS, path);
  const keys = Object.keys(where).sort();
  if (keys.length === 0) fail(path, "must not be empty");

  const output = {};
  for (const key of keys) {
    const predicatePath = `${path}.${key}`;
    const predicate = where[key];
    if (key === "issued_before_block" || key === "issued_after_block") {
      if (!Number.isSafeInteger(predicate) || predicate < 0) fail(predicatePath, "must be a non-negative integer");
      output[key] = predicate;
    } else if (key === "collection_in") {
      output[key] = stringArray(predicate, predicatePath, { slugs: true });
    } else if (key === "issuer_in") {
      output[key] = stringArray(predicate, predicatePath);
    } else if (key === "trait") {
      output[key] = normalizedAttribute(predicate, predicatePath);
    }
  }
  return output;
}

function validateSlug(slug, path = "slug") {
  if (typeof slug !== "string" || !SLUG.test(slug)) fail(path, "must be a kebab-case slug");
  return slug;
}

/** Validate a standard, self-hosted DigiRare collection feed. */
export function normalizeFeedV1(value, expectedCollection) {
  const feed = objectAt(value, "feed");
  exactKeys(feed, new Set(["schema_version", "collection", "assets"]), "feed");
  if (feed.schema_version !== 1) fail("feed.schema_version", "must equal 1");
  const collection = validateSlug(feed.collection, "feed.collection");
  if (expectedCollection !== undefined && collection !== expectedCollection) {
    fail("feed.collection", `must equal ${JSON.stringify(expectedCollection)}`);
  }
  return {
    schema_version: 1,
    collection,
    assets: normalizeAssets(feed.assets, "feed.assets"),
  };
}

/** Metadata describes the collection; membership is selected by file convention. */
export function normalizeCollectionMeta(value, slug) {
  validateSlug(slug);
  const meta = objectAt(value, `${slug}/meta.json`);
  exactKeys(meta, META_KEYS, `${slug}/meta.json`);
  if (!KINDS.has(meta.kind)) fail(`${slug}.kind`, 'must be "canonical" or "curated"');
  const normalized = {
    name: nonemptyString(meta.name, `${slug}.name`, 200),
    kind: meta.kind,
    description: nonemptyString(meta.description, `${slug}.description`, 2_000),
  };
  if (meta.links !== undefined) normalized.links = normalizeLinks(meta.links, `${slug}.links`);
  return normalized;
}

function parseJsonFile(path, label) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new CollectionValidationError(`${label}: invalid JSON (${error.message})`);
  }
}

export function readCollectionAssets(repositoryRoot, slug) {
  const path = join(repositoryRoot, "collections", slug, "assets.json");
  if (!existsSync(path)) return undefined;
  const document = objectAt(parseJsonFile(path, `${slug}/assets.json`), `${slug}/assets.json`);
  exactKeys(document, ASSETS_FILE_KEYS, `${slug}/assets.json`);
  return normalizeAssets(document.assets, `${slug}/assets.json.assets`);
}

export function readCollectionProtocol(repositoryRoot, slug) {
  const path = join(repositoryRoot, "collections", slug, "protocol.json");
  if (!existsSync(path)) return undefined;
  const document = objectAt(parseJsonFile(path, `${slug}/protocol.json`), `${slug}/protocol.json`);
  exactKeys(document, PROTOCOL_FILE_KEYS, `${slug}/protocol.json`);
  const protocol = nonemptyString(document.protocol, `${slug}/protocol.json.protocol`, 100);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(protocol)) {
    fail(`${slug}/protocol.json.protocol`, "must be a lowercase kebab-case protocol id");
  }
  return protocol;
}

export function resolveAggregatorAdapterPath(aggregatorsDirectory, provider) {
  if (typeof provider !== "string" || !PROVIDER_NAME.test(provider) || isAbsolute(provider)) {
    fail("aggregator", "provider must be a safe lowercase folder name");
  }
  const root = resolve(aggregatorsDirectory);
  const candidate = resolve(root, provider, "adapter.ts");
  const pathFromRoot = relative(root, candidate);
  if (pathFromRoot.startsWith(`..${sep}`) || pathFromRoot === ".." || isAbsolute(pathFromRoot)) {
    fail("aggregator", "adapter resolves outside the aggregators directory");
  }
  return candidate;
}

async function importAdapter(path, root, label) {
  if (!existsSync(path)) return undefined;
  const realRoot = realpathSync(resolve(root));
  const realPath = realpathSync(path);
  const realPathFromRoot = relative(realRoot, realPath);
  if (realPathFromRoot.startsWith(`..${sep}`) || realPathFromRoot === ".." || isAbsolute(realPathFromRoot)) {
    fail(label, "adapter resolves outside its source directory");
  }
  let module;
  try {
    module = await import(pathToFileURL(realPath).href);
  } catch (error) {
    throw new CollectionValidationError(`${label}: could not load adapter (${error.message})`);
  }
  if (typeof module.load !== "function") fail(label, "adapter.ts must export an async load function");
  return module;
}

function normalizeAdapterResult(result, slug, label) {
  if (result === undefined || result === null) return undefined;
  if (Array.isArray(result)) return { assets: normalizeAssets(result, `${label}.assets`) };
  if (isPlainObject(result) && Object.keys(result).length === 1 && result.where !== undefined) {
    return { where: normalizeWhere(result.where, `${label}.where`) };
  }
  return { assets: normalizeFeedV1(result, slug).assets };
}

async function runAdapter(module, label, { slug, fetchJson, fetchText, cache }) {
  try {
    const normalized = normalizeAdapterResult(
      await module.load({ collection: slug, fetchJson, fetchText, cache }),
      slug,
      label,
    );
    if (normalized === undefined) return undefined;
    if (module.overlapPolicy !== undefined && module.overlapPolicy !== "secondary") {
      fail(label, 'overlapPolicy must equal "secondary" when provided');
    }
    return module.overlapPolicy === "secondary"
      ? { ...normalized, overlapPolicy: "secondary" }
      : normalized;
  } catch (error) {
    if (error instanceof CollectionValidationError) throw error;
    throw new CollectionValidationError(`${label}: ${error.message}`);
  }
}

function aggregatorProviders(aggregatorsDirectory) {
  if (!existsSync(aggregatorsDirectory)) return [];
  return readdirSync(aggregatorsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && PROVIDER_NAME.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en"));
}

async function loadFromAggregators(slug, context) {
  const matches = [];
  for (const provider of aggregatorProviders(context.aggregatorsDirectory)) {
    const module = await importAdapter(
      resolveAggregatorAdapterPath(context.aggregatorsDirectory, provider),
      context.aggregatorsDirectory,
      `aggregators/${provider}`,
    );
    if (module === undefined) continue;
    let cache = context.adapterCache.get(provider);
    if (cache === undefined) {
      cache = new Map();
      context.adapterCache.set(provider, cache);
    }
    const result = await runAdapter(module, `aggregators/${provider}`, {
      slug,
      fetchJson: context.fetchJson,
      fetchText: context.fetchText,
      cache,
    });
    if (result !== undefined) matches.push({ provider, result });
  }
  if (matches.length === 0) fail(slug, "has no assets.json, collection adapter, or aggregator result");
  if (matches.length > 1) {
    fail(
      slug,
      `is returned by multiple aggregators (${matches.map(({ provider }) => provider).join(", ")}); ` +
        "add assets.json or a collection adapter to choose explicitly",
    );
  }
  return matches[0].result;
}

export function resolveCollectionSource(repositoryRoot, slug) {
  validateSlug(slug);
  const directory = join(repositoryRoot, "collections", slug);
  const assetsPath = join(directory, "assets.json");
  const adapterPath = join(directory, "adapter.ts");
  const protocolPath = join(directory, "protocol.json");
  if (existsSync(assetsPath)) return { type: "static", path: assetsPath };
  if (existsSync(adapterPath)) return { type: "collection-adapter", path: adapterPath };
  if (existsSync(protocolPath)) return { type: "protocol", path: protocolPath };
  return { type: "aggregator" };
}

/** Resolve assets.json, a collection adapter, a derived protocol, then aggregators. */
export async function materializeCollection({
  slug,
  meta,
  repositoryRoot = process.cwd(),
  fetchJson = createFetchJson(),
  fetchText = createFetchText(),
  aggregatorsDirectory = join(repositoryRoot, "aggregators"),
  adapterCache = new Map(),
}) {
  const normalized = normalizeCollectionMeta(meta, slug);
  const output = { slug, ...normalized };
  const source = resolveCollectionSource(repositoryRoot, slug);
  let membership;
  if (source.type === "static") {
    membership = { assets: readCollectionAssets(repositoryRoot, slug) };
  } else if (source.type === "collection-adapter") {
    const collectionRoot = join(repositoryRoot, "collections", slug);
    const module = await importAdapter(source.path, collectionRoot, `${slug}/adapter.ts`);
    let cache = adapterCache.get(slug);
    if (cache === undefined) {
      cache = new Map();
      adapterCache.set(slug, cache);
    }
    membership = await runAdapter(module, `${slug}/adapter.ts`, {
      slug,
      fetchJson,
      fetchText,
      cache,
    });
  } else if (source.type === "protocol") {
    output.protocol = readCollectionProtocol(repositoryRoot, slug);
    return output;
  } else {
    membership = await loadFromAggregators(slug, {
      aggregatorsDirectory,
      fetchJson,
      fetchText,
      adapterCache,
    });
  }

  if (membership?.assets !== undefined) {
    requireCanonicalPrimary(output.kind, membership.assets, `${slug}.assets`);
    output.assets = membership.assets;
    if (membership.overlapPolicy === "secondary") {
      Object.defineProperty(output, SECONDARY_ON_OVERLAP, { value: true });
      output.overlap_policy = "secondary";
    }
  } else if (membership?.where !== undefined) {
    if (output.kind !== "curated") fail(`${slug}/adapter.ts`, 'where rules require kind "curated"');
    output.where = membership.where;
  } else {
    fail(slug, "membership source returned nothing");
  }
  return output;
}

export function readCollectionMeta(repositoryRoot, slug) {
  const path = join(repositoryRoot, "collections", slug, "meta.json");
  if (!existsSync(path)) fail(slug, "missing meta.json");
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new CollectionValidationError(`${slug}/meta.json: invalid JSON (${error.message})`);
  }
}

export function collectionSlugs(repositoryRoot) {
  const collectionsDirectory = join(repositoryRoot, "collections");
  return readdirSync(collectionsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en"));
}

export function selectedCollectionSlugs(repositoryRoot, includeSlugs) {
  const available = collectionSlugs(repositoryRoot);
  if (includeSlugs === undefined) return { slugs: available, complete: true };
  if (!Array.isArray(includeSlugs) || includeSlugs.length === 0) {
    fail("includeSlugs", "must be a non-empty array when provided");
  }

  const requested = new Set();
  for (let index = 0; index < includeSlugs.length; index += 1) {
    const slug = validateSlug(includeSlugs[index], `includeSlugs[${index}]`);
    if (requested.has(slug)) fail(`includeSlugs[${index}]`, `duplicates ${slug}`);
    requested.add(slug);
  }
  const missing = [...requested].filter((slug) => !available.includes(slug));
  if (missing.length > 0) fail("includeSlugs", `contains unknown collection slugs: ${missing.join(", ")}`);
  return {
    slugs: available.filter((slug) => requested.has(slug)),
    complete: requested.size === available.length,
  };
}

export function validateMemberships(collections, { requirePrimaryForSecondary = true } = {}) {
  const issues = [];
  const primaries = new Map();
  const secondaries = new Map();

  for (const collection of collections) {
    if (!collection.assets) continue;
    for (const entry of collection.assets) {
      const isPrimary = collection.kind === "canonical" && entry.secondary !== true;
      if (isPrimary) {
        const existing = primaries.get(entry.asset);
        if (existing) {
          issues.push(
            `${entry.asset} has two primary memberships: ${existing} and ${collection.slug}; mark the newcomer secondary`,
          );
        } else {
          primaries.set(entry.asset, collection.slug);
        }
      } else {
        if (!secondaries.has(entry.asset)) secondaries.set(entry.asset, []);
        secondaries.get(entry.asset).push(collection.slug);
      }
    }
  }

  for (const [asset, appearances] of secondaries) {
    if (requirePrimaryForSecondary && !primaries.has(asset)) {
      issues.push(`${asset} appears only as secondary or curated (${appearances.join(", ")}) but has no primary home`);
    }
  }
  if (issues.length > 0) throw new CollectionValidationError(issues);

  return {
    primaryMemberships: primaries.size,
    secondaryMemberships: [...secondaries.values()].reduce((total, memberships) => total + memberships.length, 0),
  };
}

/**
 * Open, inclusive projects may intentionally contain assets that already have
 * a more specific canonical home. Their adapter opts into this policy; after
 * every source is materialized, those conflicting appearances are demoted to
 * secondary without weakening duplicate-primary validation for normal sets.
 */
export function applySecondaryOnOverlap(collections) {
  const appearances = new Map();
  for (const collection of collections) {
    if (collection.kind !== "canonical" || !Array.isArray(collection.assets)) continue;
    for (const entry of collection.assets) {
      if (entry.secondary === true) continue;
      const list = appearances.get(entry.asset) ?? [];
      list.push({ collection, entry });
      appearances.set(entry.asset, list);
    }
  }

  for (const entries of appearances.values()) {
    if (entries.length < 2) continue;
    const fixed = entries.filter(({ collection }) => collection[SECONDARY_ON_OVERLAP] !== true);
    if (fixed.length !== 1) continue;
    for (const appearance of entries) {
      if (appearance.collection[SECONDARY_ON_OVERLAP] === true) {
        appearance.entry.secondary = true;
      }
    }
  }
  return collections;
}

/** Validate checked-in metadata and static membership without network calls. */
export async function validateRepositoryMetadata({ repositoryRoot = process.cwd() } = {}) {
  const collections = [];
  const issues = [];
  let externalSources = 0;

  for (const slug of collectionSlugs(repositoryRoot)) {
    try {
      const normalized = normalizeCollectionMeta(readCollectionMeta(repositoryRoot, slug), slug);
      const collection = { slug, ...normalized };
      const source = resolveCollectionSource(repositoryRoot, slug);
      if (source.type === "static") {
        collection.assets = readCollectionAssets(repositoryRoot, slug);
        requireCanonicalPrimary(collection.kind, collection.assets, `${slug}.assets`);
      } else {
        if (source.type !== "protocol") externalSources += 1;
        collection.source = source.type;
        if (source.type === "collection-adapter") {
          const collectionRoot = join(repositoryRoot, "collections", slug);
          await importAdapter(source.path, collectionRoot, `${slug}/adapter.ts`);
        } else if (source.type === "protocol") {
          collection.protocol = readCollectionProtocol(repositoryRoot, slug);
        }
      }
      collections.push(collection);
    } catch (error) {
      if (error instanceof CollectionValidationError) issues.push(...error.issues);
      else issues.push(`${slug}: ${error.message}`);
    }
  }
  if (issues.length > 0) throw new CollectionValidationError(issues);

  const explicitCollections = collections.filter((collection) => collection.assets !== undefined);
  const counts = validateMemberships(explicitCollections);
  return { collections, counts, externalSources };
}

export async function materializeRepository({
  repositoryRoot = process.cwd(),
  fetchJson = createFetchJson(),
  fetchText = createFetchText(),
  aggregatorsDirectory = join(repositoryRoot, "aggregators"),
  includeSlugs,
} = {}) {
  const collections = [];
  const issues = [];
  // One source-local cache per materialization prevents duplicate requests
  // without leaking remote snapshots into later exports in this process.
  const adapterCache = new Map();
  const selection = selectedCollectionSlugs(repositoryRoot, includeSlugs);
  for (const slug of selection.slugs) {
    try {
      collections.push(
        await materializeCollection({
          slug,
          meta: readCollectionMeta(repositoryRoot, slug),
          repositoryRoot,
          fetchJson,
          fetchText,
          aggregatorsDirectory,
          adapterCache,
        }),
      );
    } catch (error) {
      if (error instanceof CollectionValidationError) issues.push(...error.issues);
      else issues.push(`${slug}: ${error.message}`);
    }
  }
  if (issues.length > 0) throw new CollectionValidationError(issues);
  applySecondaryOnOverlap(collections);
  const counts = validateMemberships(collections, {
    // A selected subset may contain a secondary appearance whose primary home
    // was intentionally omitted. Full exports still enforce the global rule.
    requirePrimaryForSecondary: selection.complete,
  });
  return { schema_version: 1, collections, counts };
}

export function repositoryRootFrom(importMetaUrl) {
  return resolve(dirname(fileURLToPath(importMetaUrl)), "..");
}
