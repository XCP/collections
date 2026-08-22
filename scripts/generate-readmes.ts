#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  materializeRepository,
  resolveCollectionSource,
} from "#lib/collection-source";

const COLLECTION_START = "<!-- collection-facts:start -->";
const COLLECTION_END = "<!-- collection-facts:end -->";
const REGISTRY_START = "<!-- registry-facts:start -->";
const REGISTRY_END = "<!-- registry-facts:end -->";

const defaultRoot = fileURLToPath(new URL("..", import.meta.url));

function count(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function percent(part, total) {
  if (total === 0) return "0%";
  const value = (100 * part) / total;
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
}

function replaceGeneratedBlock(markdown, start, end, block) {
  const startIndex = markdown.indexOf(start);
  const endIndex = markdown.indexOf(end);
  if (startIndex >= 0 || endIndex >= 0) {
    if (startIndex < 0 || endIndex < startIndex) {
      throw new Error(`README has unmatched generated markers ${start} / ${end}`);
    }
    return `${markdown.slice(0, startIndex).trimEnd()}\n\n${block}\n\n${markdown
      .slice(endIndex + end.length)
      .trimStart()}`;
  }
  const headingEnd = markdown.indexOf("\n");
  if (headingEnd < 0 || !markdown.startsWith("# ")) {
    throw new Error("README must start with an H1 heading");
  }
  return `${markdown.slice(0, headingEnd).trimEnd()}\n\n${block}\n\n${markdown
    .slice(headingEnd + 1)
    .trimStart()}`;
}

function sourceLabel(repositoryRoot, collection) {
  const source = resolveCollectionSource(repositoryRoot, collection.slug);
  if (source.type === "static") return "Reviewed static `assets.json`";
  if (source.type === "metadata-only") return "Marketplace indexer";
  if (source.type === "collection-adapter") {
    return collection.where === undefined
      ? "Collection-operated `adapter.ts`"
      : "Computed `adapter.ts`";
  }
  return "Aggregator adapter";
}

function traitSummary(assets) {
  if (!Array.isArray(assets) || assets.length === 0) return "None";
  const coverage = new Map();
  for (const entry of assets) {
    const present = new Set((entry.attributes ?? []).map((attribute) => attribute.trait_type));
    for (const traitType of present) coverage.set(traitType, (coverage.get(traitType) ?? 0) + 1);
  }
  if (coverage.size === 0) return "None";
  return [...coverage.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "en"))
    .map(([traitType, covered]) =>
      `${traitType}: ${count(covered)}/${count(assets.length)} (${percent(covered, assets.length)})`
    )
    .join("<br>");
}

export function collectionFactsBlock(repositoryRoot, collection) {
  const assets = collection.assets ?? [];
  const indexedByMarketplace = collection.slug === "bitcoin-stamps";
  const computedFromChain = collection.where !== undefined;
  const primary = collection.kind === "canonical"
    ? assets.filter((entry) => entry.secondary !== true).length
    : 0;
  const secondary = assets.length - primary;
  const membership = computedFromChain
    ? `Resolved from chain facts: \`${JSON.stringify(collection.where)}\``
    : indexedByMarketplace
      ? "Indexed by the marketplace"
      : `${count(assets.length)} assets`;
  const primaryDisplay = indexedByMarketplace
    ? "Determined during marketplace ingest"
    : count(primary);
  const secondaryDisplay = indexedByMarketplace || computedFromChain
    ? "Determined during marketplace ingest"
    : count(secondary);

  return [
    COLLECTION_START,
    "## Registry facts",
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| Type | ${collection.kind === "canonical" ? "Canonical collection" : "Curated view"} |`,
    `| Membership | ${membership} |`,
    `| Primary memberships | ${primaryDisplay} |`,
    `| Secondary or curated memberships | ${secondaryDisplay} |`,
    `| Source | ${sourceLabel(repositoryRoot, collection)} |`,
    `| Traits | ${traitSummary(assets)} |`,
    COLLECTION_END,
  ].join("\n");
}

export function registryFactsBlock(repositoryRoot, collections, counts) {
  const sourceCounts = new Map();
  const traits = new Set();
  const uniqueAssets = new Set();
  let memberships = 0;
  let attributedMemberships = 0;
  for (const collection of collections) {
    const sourceType = resolveCollectionSource(repositoryRoot, collection.slug).type;
    sourceCounts.set(sourceType, (sourceCounts.get(sourceType) ?? 0) + 1);
    for (const entry of collection.assets ?? []) {
      memberships++;
      uniqueAssets.add(entry.asset);
      if ((entry.attributes ?? []).length > 0) attributedMemberships++;
      for (const attribute of entry.attributes ?? []) traits.add(attribute.trait_type);
    }
  }
  const aggregators = readdirSync(join(repositoryRoot, "aggregators"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en"));

  return [
    REGISTRY_START,
    "## Registry snapshot",
    "",
    "| What is tracked | Count |",
    "| --- | ---: |",
    `| Collections | ${count(collections.length)} |`,
    `| Canonical collections | ${count(collections.filter(({ kind }) => kind === "canonical").length)} |`,
    `| Curated views | ${count(collections.filter(({ kind }) => kind === "curated").length)} |`,
    `| Explicit unique assets | ${count(uniqueAssets.size)} |`,
    `| Explicit collection memberships | ${count(memberships)} |`,
    `| Primary memberships | ${count(counts.primaryMemberships)} |`,
    `| Secondary or curated memberships | ${count(counts.secondaryMemberships)} |`,
    `| Memberships with traits | ${count(attributedMemberships)} |`,
    "",
    "| Membership source | Collections |",
    "| --- | ---: |",
    `| Reviewed static \`assets.json\` | ${count(sourceCounts.get("static") ?? 0)} |`,
    `| Collection or computed adapters | ${count(sourceCounts.get("collection-adapter") ?? 0)} |`,
    `| Marketplace-indexed exceptions | ${count(sourceCounts.get("metadata-only") ?? 0)} |`,
    `| Active aggregator sources | ${count(sourceCounts.get("aggregator") ?? 0)} |`,
    `| Available aggregators | ${count(aggregators.length)} |`,
    "",
    "Explicit membership counts exclude collections resolved later from chain facts, including Bitcoin Stamps and Pre-Ethereum.",
    "",
    `Trait types: ${traits.size > 0 ? [...traits].sort().join(", ") : "none"}.`,
    "",
    `Available aggregators: ${aggregators.map((provider) => `[${provider}](aggregators/${provider}/)`).join(", ")}.`,
    REGISTRY_END,
  ].join("\n");
}

export function renderCollectionReadme(repositoryRoot, collection, current) {
  const named = current.replace(/^# .*$/m, `# ${collection.name}`);
  return `${replaceGeneratedBlock(
    named,
    COLLECTION_START,
    COLLECTION_END,
    collectionFactsBlock(repositoryRoot, collection),
  ).trim()}\n`;
}

export function renderRootReadme(repositoryRoot, collections, counts, current) {
  return `${replaceGeneratedBlock(
    current,
    REGISTRY_START,
    REGISTRY_END,
    registryFactsBlock(repositoryRoot, collections, counts),
  ).trim()}\n`;
}

export async function runGenerateReadmes(argv = process.argv.slice(2)) {
  const check = argv.includes("--check");
  const unknown = argv.filter((argument) => argument !== "--check");
  if (unknown.length > 0) throw new Error(`unknown argument: ${unknown[0]}`);

  const repositoryRoot = resolve(defaultRoot);
  const { collections, counts } = await materializeRepository({ repositoryRoot });
  const changes = [];
  for (const collection of collections) {
    const path = join(repositoryRoot, "collections", collection.slug, "README.md");
    const current = readFileSync(path, "utf8");
    const rendered = renderCollectionReadme(repositoryRoot, collection, current);
    if (rendered !== current) {
      changes.push(path);
      if (!check) writeFileSync(path, rendered, "utf8");
    }
  }

  const rootPath = join(repositoryRoot, "README.md");
  const rootCurrent = readFileSync(rootPath, "utf8");
  const rootRendered = renderRootReadme(repositoryRoot, collections, counts, rootCurrent);
  if (rootRendered !== rootCurrent) {
    changes.push(rootPath);
    if (!check) writeFileSync(rootPath, rootRendered, "utf8");
  }

  if (check && changes.length > 0) {
    throw new Error(`${changes.length} generated README files are out of date; run npm run docs`);
  }
  console.log(`✓ ${check ? "checked" : "updated"} ${collections.length} collection README files and the root snapshot`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await runGenerateReadmes();
}
