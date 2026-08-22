#!/usr/bin/env node
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const root = process.cwd();

function hasAdapterFixture(directory) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) return false;
  return readdirSync(directory, { withFileTypes: true }).some((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return hasAdapterFixture(path);
    return entry.isFile() && /\.(?:js|json|txt)$/i.test(entry.name);
  });
}

for (const entry of readdirSync(join(root, "collections"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const slug = entry.name;
  const directory = join(root, "collections", slug);
  if (!existsSync(join(directory, "README.md"))) errors.push(`${slug}: missing collections/${slug}/README.md`);
  if (existsSync(join(directory, "adapter.ts"))) {
    const testPath = join(root, "test", "collections", `${slug}.test.ts`);
    if (!existsSync(testPath)) errors.push(`${slug}: collection adapter requires test/collections/${slug}.test.ts`);
  }
}

const aggregatorsDirectory = join(root, "aggregators");
for (const entry of readdirSync(aggregatorsDirectory, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const provider = entry.name;
  const providerDirectory = join(aggregatorsDirectory, provider);
  const testPath = join(root, "test", "adapters", `${provider}.test.ts`);
  const fixtureDirectory = join(root, "test", "fixtures", "adapters", provider);
  if (!existsSync(join(providerDirectory, "adapter.ts"))) {
    errors.push(`${provider}: missing aggregators/${provider}/adapter.ts`);
  }
  if (!existsSync(join(providerDirectory, "README.md"))) {
    errors.push(`${provider}: missing aggregators/${provider}/README.md`);
  }
  if (!existsSync(testPath)) errors.push(`${provider}: missing test/adapters/${provider}.test.ts`);
  if (!hasAdapterFixture(fixtureDirectory)) {
    errors.push(`${provider}: add a fixture under test/fixtures/adapters/${provider}/`);
  }
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} source-coverage problem${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log("✓ collection and aggregator adapters have fixture-backed coverage");
}
