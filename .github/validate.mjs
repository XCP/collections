/**
 * PR validation for the curation index. Self-contained, no dependencies:
 *   node .github/validate.mjs
 *
 * Checks every collections/<slug>/meta.json for shape, canonical asset ids,
 * and cross-collection membership consistency: an asset has exactly one
 * PRIMARY membership — an unflagged entry in a kind:"canonical" collection.
 * Adding an asset that already has a primary home elsewhere is welcome, but
 * the newcomer must say so with "secondary": true.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const NAMED_ASSET = /^[B-Z][A-Z]{3,11}$/;
const NUMERIC_ASSET = /^A\d{1,20}$/;
const KINDS = new Set(["canonical", "curated"]);
const ENTRY_KEYS = new Set(["asset", "secondary", "attributes"]);
const WHERE_KEYS = new Set([
  "issued_before_block",
  "issued_after_block",
  "collection_in",
  "issuer_in",
  "trait",
  "explorer_tag",
]);

const errors = [];
const err = (msg) => errors.push(msg);

const root = "collections";
const slugs = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

/** asset -> {slug} of its primary (unflagged canonical) membership */
const primaries = new Map();
/** asset -> [slugs] of secondary/curated appearances */
const secondaries = new Map();

for (const slug of slugs) {
  const path = join(root, slug, "meta.json");
  if (!existsSync(path)) {
    err(`${slug}: missing meta.json`);
    continue;
  }
  let meta;
  try {
    meta = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    err(`${slug}/meta.json: not valid JSON (${error.message})`);
    continue;
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) err(`${slug}: folder name must be a kebab-case slug`);
  if (typeof meta.name !== "string" || meta.name.length === 0) err(`${slug}: "name" is required`);
  if (typeof meta.description !== "string" || meta.description.length === 0) err(`${slug}: "description" is required`);
  if (!KINDS.has(meta.kind)) err(`${slug}: "kind" must be "canonical" or "curated"`);

  const hasAssets = Array.isArray(meta.assets);
  const hasWhere = meta.where !== undefined;
  if (hasAssets === hasWhere) {
    err(`${slug}: define membership with exactly one of "assets" (a list) or "where" (a rule)`);
    continue;
  }
  if (hasWhere) {
    if (meta.kind !== "curated") {
      err(`${slug}: "where" membership is only for kind:"curated" — a canonical home must enumerate its assets`);
    }
    if (typeof meta.where !== "object" || meta.where === null || Array.isArray(meta.where)) {
      err(`${slug}: "where" must be an object`);
      continue;
    }
    const keys = Object.keys(meta.where);
    if (keys.length === 0) err(`${slug}: "where" is empty`);
    for (const key of keys) {
      if (!WHERE_KEYS.has(key)) err(`${slug}: unknown "where" predicate "${key}" (allowed: ${[...WHERE_KEYS].join(", ")})`);
    }
    continue;
  }

  if (meta.assets.length === 0) {
    err(`${slug}: "assets" must not be empty`);
    continue;
  }
  const seen = new Set();
  for (const entry of meta.assets) {
    if (typeof entry !== "object" || entry === null || typeof entry.asset !== "string") {
      err(`${slug}: every assets entry needs an "asset" id`);
      continue;
    }
    const id = entry.asset;
    for (const key of Object.keys(entry)) {
      if (!ENTRY_KEYS.has(key)) err(`${slug}: ${id}: unknown entry key "${key}"`);
    }
    if (id.includes(".")) {
      err(`${slug}: ${id} is a subasset longname — use its canonical A-number id (longnames are display metadata, never keys)`);
      continue;
    }
    if (!NAMED_ASSET.test(id) && !NUMERIC_ASSET.test(id)) {
      err(`${slug}: ${id} is not a valid Counterparty asset id`);
      continue;
    }
    if (seen.has(id)) {
      err(`${slug}: duplicate asset ${id}`);
      continue;
    }
    seen.add(id);
    if (entry.attributes !== undefined) {
      if (!Array.isArray(entry.attributes)) {
        err(`${slug}: ${id}: "attributes" must be an array`);
      } else {
        for (const attr of entry.attributes) {
          if (
            typeof attr !== "object" ||
            attr === null ||
            typeof attr.trait_type !== "string" ||
            (typeof attr.value !== "string" && typeof attr.value !== "number")
          ) {
            err(`${slug}: ${id}: attributes entries are { "trait_type": string, "value": string|number }`);
          }
        }
      }
    }

    const isPrimary = meta.kind === "canonical" && entry.secondary !== true;
    if (isPrimary) {
      const existing = primaries.get(id);
      if (existing) {
        err(
          `${id} has two primary memberships: ${existing} and ${slug}. ` +
            `An asset has exactly one canonical home — the newcomer marks its entry { "asset": "${id}", "secondary": true }.`,
        );
      } else {
        primaries.set(id, slug);
      }
    } else {
      if (!secondaries.has(id)) secondaries.set(id, []);
      secondaries.get(id).push(slug);
    }
  }
}

// A secondary entry with no primary anywhere is a dangling flag: if this
// collection is the asset's only membership, it IS the home — unflag it.
for (const [id, slugsWithIt] of secondaries) {
  if (!primaries.has(id)) {
    err(
      `${id} appears only as secondary or in curated views (${slugsWithIt.join(", ")}) but has no primary home. ` +
        `If ${slugsWithIt[0]} is its home, remove "secondary": true; otherwise add it to its canonical collection first.`,
    );
  }
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} problem${errors.length === 1 ? "" : "s"}:\n`);
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}
console.log(`✓ ${slugs.length} collections, ${primaries.size} primary memberships, ${[...secondaries.values()].flat().length} secondary — all valid`);
