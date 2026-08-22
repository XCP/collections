#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { CollectionValidationError, materializeRepository } from "#lib/collection-source";

const defaultRoot = fileURLToPath(new URL("..", import.meta.url));

export function parseArguments(argv, initialRoot = defaultRoot) {
  const options = {
    repositoryRoot: initialRoot,
    outputPath: undefined,
    includeSlugs: undefined,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") {
      const value = argv[++index];
      if (!value) throw new Error("--root requires a path");
      options.repositoryRoot = resolve(value);
    } else if (argument === "--output") {
      const value = argv[++index];
      if (!value) throw new Error("--output requires a path");
      options.outputPath = resolve(value);
    } else if (argument === "--include") {
      const value = argv[++index];
      if (!value) throw new Error("--include requires one or more comma-separated slugs");
      const slugs = value.split(",");
      if (slugs.some((slug) => slug.length === 0)) {
        throw new Error("--include requires non-empty comma-separated slugs");
      }
      options.includeSlugs ??= [];
      options.includeSlugs.push(...slugs);
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }
  options.outputPath ??= resolve(options.repositoryRoot, "dist", "collections.json");
  return options;
}

export async function runExport(argv = process.argv.slice(2)) {
  try {
    const { repositoryRoot, outputPath, includeSlugs } = parseArguments(argv);
    const { schema_version, collections, counts } = await materializeRepository({
      repositoryRoot,
      includeSlugs,
    });
    const artifact = { schema_version, collections };
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
    console.log(
      `✓ exported ${collections.length} collections, ${counts.primaryMemberships} primary memberships, ` +
        `${counts.secondaryMemberships} secondary memberships to ${outputPath}`,
    );
    return artifact;
  } catch (error) {
    if (error instanceof CollectionValidationError) {
      console.error(`✗ ${error.issues.length} validation problem${error.issues.length === 1 ? "" : "s"}:`);
      for (const issue of error.issues) console.error(`  - ${issue}`);
    } else {
      console.error(`✗ ${error.message}`);
    }
    process.exitCode = 1;
    return undefined;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await runExport();
