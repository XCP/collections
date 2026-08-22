import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { load, overlapPolicy } from "#collections/kaleidoscope";

const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/collections/kaleidoscope/page-1.json", import.meta.url), "utf8"),
);

test("uses the official API, preserves its ordinal, and normalizes named-asset casing", async () => {
  const requested = [];
  const assets = await load({
    fetchJson: async (url, options) => {
      requested.push({ url, options });
      return structuredClone(fixture);
    },
    cache: new Map(),
  });

  assert.equal(overlapPolicy, "secondary");
  assert.deepEqual(assets, [
    {
      asset: "RAREPEPE",
      attributes: [{ trait_type: "Kaleidoscope ID", value: 2380 }],
    },
    {
      asset: "SATANSHI",
      attributes: [{ trait_type: "Kaleidoscope ID", value: 2378 }],
    },
    {
      asset: "PEPESTRY.TAPESTRY",
      attributes: [{ trait_type: "Kaleidoscope ID", value: 2377 }],
    },
  ]);
  assert.equal(requested.length, 1);
  assert.match(requested[0].url, /kaleidoscopexcp\.net\/api\/search\?page=1&pageSize=60$/);
});

test("fails closed if the source changes while pages are being read", async () => {
  const first = { ...fixture, total: 61, items: fixture.items.slice(0, 1) };
  const second = { page: 2, pageSize: 60, total: 62, items: [] };
  await assert.rejects(
    load({
      fetchJson: async (url) => (url.includes("page=1") ? first : second),
      cache: new Map(),
    }),
    /total changed during pagination/,
  );
});
