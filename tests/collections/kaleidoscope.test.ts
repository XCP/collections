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

test("preserves the reviewed PEPESHOOD credit across API refreshes without creating membership", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "PEPESHOOD";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, fixture.items.length);
  assert.deepEqual(assets[0].attributes, [
    { trait_type: "Kaleidoscope ID", value: 2380 },
    { trait_type: "Artist", value: "subterranean" },
  ]);
  assert.ok(assets.slice(1).every(asset => !asset.attributes.some(trait => trait.trait_type === "Artist")));
});

test("preserves the signed PEPEFAKERARE artist without extending official membership", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "PEPEFAKERARE";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, fixture.items.length);
  assert.deepEqual(assets[0].attributes, [
    { trait_type: "Kaleidoscope ID", value: 2380 },
    { trait_type: "Artist", value: "BIGTOX" },
  ]);
  assert.ok(assets.slice(1).every(asset => !asset.attributes.some(trait => trait.trait_type === "Artist")));
});

test("credits TMDAUTOGRAPH to its documented artist instead of its issuer", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "TMDAUTOGRAPH";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, fixture.items.length);
  assert.deepEqual(assets[0].attributes, [
    { trait_type: "Kaleidoscope ID", value: 2380 },
    { trait_type: "Artist", value: "ArtemTemaDa" },
  ]);
});

test("preserves the documented CYPHERPOOHNK credit across membership refreshes", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "CYPHERPOOHNK";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, fixture.items.length);
  assert.deepEqual(assets[0].attributes, [
    { trait_type: "Kaleidoscope ID", value: 2380 },
    { trait_type: "Artist", value: "Remster" },
  ]);
});
