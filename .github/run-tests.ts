#!/usr/bin/env node
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const testRoot = join(root, "tests");

function testFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return testFiles(path);
      return entry.isFile() && entry.name.endsWith(".test.ts") ? [relative(root, path)] : [];
    })
    .sort();
}

const files = testFiles(testRoot);
if (files.length === 0) {
  console.error("✗ no *.test.ts files found under tests/");
  process.exit(1);
}

const result = spawnSync(process.execPath, ["--test", ...files], {
  cwd: root,
  stdio: "inherit",
});
if (result.error) {
  console.error(`✗ could not start Node.js test runner: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
