import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  collectionFactsBlock,
  renderCollectionReadme,
} from "#scripts/generate-readmes";

const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));

test("generated collection facts replace generic headings and remain idempotent", () => {
  const assets = JSON.parse(
    readFileSync(new URL("../collections/rare-pepe/assets.json", import.meta.url), "utf8"),
  ).assets;
  const collection = {
    slug: "rare-pepe",
    name: "Rare Pepe",
    kind: "canonical",
    assets,
  };
  const initial = "# Update this collection\n\nHuman-maintained guidance.\n";
  const rendered = renderCollectionReadme(repositoryRoot, collection, initial);

  assert.match(rendered, /^# Rare Pepe$/m);
  assert.match(rendered, /\| Membership \| 1,774 assets \|/);
  assert.match(rendered, /Artist: 1,774\/1,774 \(100%\)/);
  assert.match(rendered, /Human-maintained guidance\./);
  assert.equal(renderCollectionReadme(repositoryRoot, collection, rendered), rendered);
});

test("marketplace-indexed collections do not report a misleading zero membership", () => {
  const block = collectionFactsBlock(repositoryRoot, {
    slug: "bitcoin-stamps",
    name: "Bitcoin Stamps",
    kind: "canonical",
  });
  assert.match(block, /Indexed by the marketplace/);
  assert.match(block, /Determined during marketplace ingest/);
});
