/**
 * Deterministically validate checked-in collection metadata and adapter
 * contracts without calling live project APIs:
 *   node .github/validate.ts
 */
import { CollectionValidationError, validateRepositoryMetadata } from "#lib/collection-source";

try {
  const { collections, counts, externalSources } = await validateRepositoryMetadata({ repositoryRoot: process.cwd() });
  console.log(
    `✓ ${collections.length} collections, ${counts.primaryMemberships} primary memberships, ` +
      `${counts.secondaryMemberships} secondary` +
      `${externalSources > 0 ? `, ${externalSources} non-static source` : ""}; all metadata valid`,
  );
} catch (error) {
  if (error instanceof CollectionValidationError) {
    console.error(`✗ ${error.issues.length} problem${error.issues.length === 1 ? "" : "s"}:\n`);
    for (const issue of error.issues) console.error(`  - ${issue}`);
  } else {
    console.error(`✗ ${error.message}`);
  }
  process.exitCode = 1;
}
