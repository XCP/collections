/**
 * Materialize every conventional collection source, validate global
 * primary/secondary membership, and resolve rule views that depend only on
 * that normalized repository data.
 *
 * Chain-backed computed views remain declarations until the marketplace's
 * many-to-many membership index can materialize them efficiently. CI reports
 * those rules as deferred; it does not issue one Counterparty request per
 * curated asset.
 */
import { appendFileSync } from "node:fs";

import { materializeRepository } from "#lib/collection-source";

const CHAIN_PREDICATES = new Set(["issued_before_block", "issued_after_block", "issuer_in"]);

const ruleCollections = [];
const universe = [];
const { collections, counts } = await materializeRepository({ repositoryRoot: process.cwd() });
for (const collection of collections) {
  if (collection.where !== undefined) {
    ruleCollections.push(collection);
    continue;
  }
  if (collection.kind !== "canonical") continue;
  for (const entry of collection.assets) {
    if (entry.secondary === true) continue;
    universe.push({
      asset: entry.asset,
      slug: collection.slug,
      attributes: entry.attributes ?? [],
    });
  }
}

console.log(
  `materialized ${collections.length} collections: ${counts.primaryMemberships} primary and ` +
    `${counts.secondaryMemberships} secondary/curated memberships`,
);

if (ruleCollections.length === 0) {
  console.log("no rule-defined collections — nothing else to resolve");
  process.exit(0);
}

function matchesLocalRule(entry, where) {
  for (const [key, value] of Object.entries(where)) {
    if (key === "collection_in" && !value.includes(entry.slug)) return false;
    if (
      key === "trait" &&
      !entry.attributes.some(
        (attribute) => attribute.trait_type === value.trait_type && attribute.value === value.value,
      )
    ) {
      return false;
    }
  }
  return true;
}

let failed = false;
const summary = [
  "## Rule-defined collections",
  "",
  "| collection | rule | status | members |",
  "|---|---|---|---|",
];

for (const collection of ruleCollections) {
  const keys = Object.keys(collection.where);
  const chainPredicates = keys.filter((key) => CHAIN_PREDICATES.has(key));
  if (chainPredicates.length > 0) {
    const status = `deferred chain predicates: ${chainPredicates.join(", ")}`;
    console.log(`${collection.slug}: ${status}`);
    summary.push(`| ${collection.slug} | \`${JSON.stringify(collection.where)}\` | ${status} | — |`);
    continue;
  }

  const members = universe.filter((entry) => matchesLocalRule(entry, collection.where));
  const share = ((100 * members.length) / universe.length).toFixed(1);
  console.log(`${collection.slug}: ${members.length} of ${universe.length} curated assets (${share}%)`);
  console.log(
    `  sample: ${members.slice(0, 20).map((entry) => entry.asset).join(", ")}${members.length > 20 ? ", …" : ""}`,
  );
  summary.push(
    `| ${collection.slug} | \`${JSON.stringify(collection.where)}\` | resolved | ${members.length} (${share}%) |`,
  );
  if (members.length === 0) {
    console.error(`✗ ${collection.slug}: rule matches nothing`);
    failed = true;
  } else if (members.length === universe.length) {
    console.error(`✗ ${collection.slug}: rule matches the entire curated universe`);
    failed = true;
  }
}

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary.join("\n")}\n`);
}
process.exit(failed ? 1 : 0);
