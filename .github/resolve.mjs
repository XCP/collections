/**
 * Materialize rule-defined ("where") collections so reviewers approve the
 * actual membership, not the prose of a rule:
 *   node .github/resolve.mjs
 *
 * The universe a rule selects from is this repo's primary memberships —
 * never the whole chain. Chain facts (issuance block, issuer) come from the
 * public explorer API. Output: per-collection counts + samples, and a
 * markdown table into $GITHUB_STEP_SUMMARY when CI provides one.
 *
 * A rule that matches nothing, or matches the entire universe, fails — a
 * lens that selects everything or nothing is not a meaningful collection.
 */
import { appendFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const EXPLORER = "https://api.xcp.io/v2";
const HEADERS = { accept: "application/json", "user-agent": "digirare-curation-ci/1.0" };
const CONCURRENCY = 10;

const root = "collections";
const slugs = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const ruleCollections = [];
const universe = []; // {asset, slug, attributes}
for (const slug of slugs) {
  const meta = JSON.parse(readFileSync(join(root, slug, "meta.json"), "utf8"));
  if (meta.where !== undefined) {
    ruleCollections.push({ slug, meta });
    continue;
  }
  if (meta.kind !== "canonical") continue;
  for (const entry of meta.assets) {
    if (entry.secondary === true) continue;
    universe.push({ asset: entry.asset, slug, attributes: entry.attributes ?? [] });
  }
}

if (ruleCollections.length === 0) {
  console.log("no rule-defined collections — nothing to resolve");
  process.exit(0);
}

// Which facts do the rules actually need? Fetch only that much.
const allKeys = new Set(ruleCollections.flatMap(({ meta }) => Object.keys(meta.where)));
const needsFacts = ["issued_before_block", "issued_after_block", "issuer_in"].some((key) => allKeys.has(key));

const facts = new Map(); // asset -> {block, issuer, id}
if (needsFacts) {
  console.log(`fetching chain facts for ${universe.length} assets from the explorer…`);
  let next = 0;
  const failures = [];
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, universe.length) }, async () => {
      while (next < universe.length) {
        const { asset } = universe[next++];
        try {
          const response = await fetch(`${EXPLORER}/assets/${encodeURIComponent(asset)}`, { headers: HEADERS });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const { result } = await response.json();
          facts.set(asset, {
            block: result.first_issuance_block_index ?? null,
            issuer: result.issuer ?? null,
            id: result.asset,
          });
        } catch (error) {
          failures.push(`${asset}: ${error.message}`);
        }
      }
    }),
  );
  if (failures.length > 0) {
    console.error(`✗ ${failures.length} assets failed to resolve facts:`);
    for (const line of failures.slice(0, 10)) console.error(`  - ${line}`);
    process.exit(1);
  }
}

const tagMembers = new Map(); // tag -> Set(ids and longnames)
for (const { meta } of ruleCollections) {
  const tag = meta.where.explorer_tag;
  if (typeof tag !== "string" || tagMembers.has(tag)) continue;
  const response = await fetch(`${EXPLORER}/tags/${encodeURIComponent(tag)}?limit=10000`, { headers: HEADERS });
  if (!response.ok) {
    console.error(`✗ explorer_tag "${tag}" -> HTTP ${response.status}`);
    process.exit(1);
  }
  const data = await response.json();
  const members = new Set();
  for (const member of data.result?.members ?? []) {
    if (member.asset) members.add(member.asset);
    if (member.asset_longname) members.add(member.asset_longname);
  }
  tagMembers.set(tag, members);
}

const matches = (entry, where) => {
  const fact = facts.get(entry.asset);
  for (const [key, value] of Object.entries(where)) {
    switch (key) {
      case "issued_before_block":
        if (!(fact?.block < value)) return false;
        break;
      case "issued_after_block":
        if (!(fact?.block > value)) return false;
        break;
      case "collection_in":
        if (!value.includes(entry.slug)) return false;
        break;
      case "issuer_in":
        if (!value.includes(fact?.issuer)) return false;
        break;
      case "trait":
        if (!entry.attributes.some((a) => a.trait_type === value.trait_type && a.value === value.value)) return false;
        break;
      case "explorer_tag":
        if (!tagMembers.get(value)?.has(entry.asset) && !tagMembers.get(value)?.has(facts.get(entry.asset)?.id)) {
          return false;
        }
        break;
      default:
        console.error(`✗ unknown predicate "${key}"`);
        process.exit(1);
    }
  }
  return true;
};

let failed = false;
const summaryLines = ["## Rule-defined collections, materialized", "", "| collection | rule | members | of universe |", "|---|---|---|---|"];
for (const { slug, meta } of ruleCollections) {
  const members = universe.filter((entry) => matches(entry, meta.where));
  const share = ((100 * members.length) / universe.length).toFixed(1);
  console.log(`\n${slug}: ${JSON.stringify(meta.where)}`);
  console.log(`  ${members.length} of ${universe.length} curated assets (${share}%)`);
  console.log(`  sample: ${members.slice(0, 20).map((entry) => entry.asset).join(", ")}${members.length > 20 ? ", …" : ""}`);
  summaryLines.push(`| ${slug} | \`${JSON.stringify(meta.where)}\` | ${members.length} | ${share}% |`);
  if (members.length === 0) {
    console.error(`✗ ${slug}: rule matches nothing`);
    failed = true;
  } else if (members.length === universe.length) {
    console.error(`✗ ${slug}: rule matches the entire curated universe — not a meaningful view`);
    failed = true;
  }
}
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summaryLines.join("\n")}\n`);
}
process.exit(failed ? 1 : 0);
