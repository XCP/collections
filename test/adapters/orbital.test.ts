import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { load } from "#aggregators/orbital";

const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/adapters/orbital/chain-chronicles.json", import.meta.url), "utf8"),
);

test("retains only canonical identifiers and scalar editorial attributes", async () => {
  const requested = [];
  const result = await load({
    collection: "chain-chronicles",
    cache: new Map(),
    fetchJson: async (url, options) => {
      requested.push({ url, options });
      return structuredClone(url.includes("/collections/") ? fixture.descriptor : fixture.page);
    },
  });

  assert.deepEqual(result, [
    { asset: "CCONEJUN" },
    {
      asset: "CCONEAUG",
      attributes: [
        { trait_type: "Month", value: "August" },
        { trait_type: "Year", value: 2023 },
      ],
    },
  ]);
  assert.equal(requested.length, 2);
  assert.match(requested[0].url, /api\.orbital\.market\/collections\/chain-chronicles$/);
  assert.match(requested[1].url, /collection=chain-chronicles/);
});

test("returns no match when Orbital has no exact collection slug", async () => {
  const result = await load({
    collection: "missing-set",
    cache: new Map(),
    fetchJson: async () => {
      const error = new Error("not found");
      error.status = 404;
      throw error;
    },
  });
  assert.equal(result, undefined);
});

test("rejects market display names in place of Counterparty identifiers", async () => {
  const invalid = structuredClone(fixture);
  invalid.page.data[0].token = "Pretty Display Title";
  await assert.rejects(
    load({
      collection: "chain-chronicles",
      cache: new Map(),
      fetchJson: async (url) =>
        structuredClone(url.includes("/collections/") ? invalid.descriptor : invalid.page),
    }),
    /not a Counterparty asset identifier/,
  );
});
