/**
 * Add every numeric asset id listed in a static assets.json to
 * data/numeric-assets.json, as null for a plain numeric asset or as its
 * longname for a subasset (which must then be listed by that longname):
 *   npm run numeric:resolve
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const mapPath = join(root, "data", "numeric-assets.json");
const map: Record<string, string | null> = existsSync(mapPath) ? JSON.parse(readFileSync(mapPath, "utf8")) : {};
const wanted = new Set<string>();
for (const slug of readdirSync(join(root, "collections"))) {
  const file = join(root, "collections", slug, "assets.json");
  if (!existsSync(file)) continue;
  for (const entry of JSON.parse(readFileSync(file, "utf8")).assets) {
    if (/^A\d{17,20}$/.test(entry.asset) && !Object.hasOwn(map, entry.asset)) wanted.add(entry.asset);
  }
}
for (const asset of wanted) {
  const response = await fetch(`https://api.counterparty.io:4000/v2/assets/${asset}`);
  if (!response.ok) throw new Error(`${asset}: Counterparty answered ${response.status}`);
  const body = await response.json() as { result?: { asset_longname?: string | null } };
  if (!body.result) throw new Error(`${asset}: not a Counterparty asset`);
  map[asset] = body.result.asset_longname ?? null;
  console.log(`${asset} -> ${map[asset] ?? "plain numeric"}`);
}
const sorted = Object.fromEntries(Object.keys(map).sort().map((key) => [key, map[key]]));
writeFileSync(mapPath, JSON.stringify(sorted, null, 1) + "\n");
console.log(`${wanted.size} resolved; ${Object.keys(sorted).length} known numeric ids`);
