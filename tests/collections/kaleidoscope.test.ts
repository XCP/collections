import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { load, overlapPolicy } from "#collections/kaleidoscope";

const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/collections/kaleidoscope/page-1.json", import.meta.url), "utf8"),
);

test("retains BITSAMURAI auction credit and source traits across refreshes", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "BITSAMURAI";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, fixture.items.length);
  assert.deepEqual(assets[0].attributes, [
    { trait_type: "Kaleidoscope ID", value: 2380 },
    { trait_type: "Artist", value: "BTC Monk" },
  ]);
  assert.ok(assets.slice(1).every(asset => !asset.attributes.some(trait => trait.trait_type === "Artist")));
});

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
    { trait_type: "Art year", value: 2021 },
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

test("retains LOOKSRARE attribution without adding unrelated credits or members", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "LOOKSRARE";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, fixture.items.length);
  assert.deepEqual(assets[0].attributes, [
    { trait_type: "Kaleidoscope ID", value: 2380 },
    { trait_type: "Artist", value: "M0d3d3b0" },
  ]);
  assert.ok(assets.slice(1).every(asset => !asset.attributes.some(trait => trait.trait_type === "Artist")));
});

test("retains reviewed PitooPi and mellow credits without inventing membership", async () => {
  for (const [name, artist] of [["BLOCKVII","pitoopi"],["PEPESTATION","pitoopi"],["MINDBENDERS.METABALLS.001","mellow"],["MINDBENDERS.METABALLS.002","mellow"],["MINDBENDERS.METABALLS.003","mellow"],["MINDBENDERS.SPHERE.001","mellow"]]) {
    const response = structuredClone(fixture);
    response.items[0].assetName = name;
    const assets = await load({ fetchJson: async () => response, cache: new Map() });
    assert.equal(assets.length, fixture.items.length);
    assert.equal(assets[0].asset, name);
    assert.deepEqual(assets[0].attributes, [{ trait_type: "Kaleidoscope ID", value: 2380 }, { trait_type: "Artist", value: artist }]);
    assert.ok(assets.slice(1).every(a => !a.attributes.some(t => t.trait_type === "Artist")));
  }
});

test("retains the documented TRUMPED artist without inventing membership", async () => {
  for (const [name, artist] of [["TRUMPED","Waldemar"]]) {
    const response = structuredClone(fixture);
    response.items[0].assetName = name;
    const assets = await load({ fetchJson: async () => response, cache: new Map() });
    assert.equal(assets.length, fixture.items.length);
    assert.equal(assets[0].asset, name);
    assert.deepEqual(assets[0].attributes, [{ trait_type: "Kaleidoscope ID", value: 2380 }, { trait_type: "Art year", value: 2023 }, { trait_type: "Artist", value: artist }]);
    assert.ok(assets.slice(1).every(a => !a.attributes.some(t => t.trait_type === "Artist")));
  }
});

test("keeps JP Janssen's book and separately recorded image credits on refresh", async () => {
  for (const [name, year] of [["JPJA", 2014], ["OLGA", 2015], ["SALVATION", 2015], ["RETARDPEPE", 2017]]) {
    const response = structuredClone(fixture);
    response.items[0].assetName = name;
    const assets = await load({ fetchJson: async () => response, cache: new Map() });
    assert.equal(assets.length, fixture.items.length);
    assert.deepEqual(assets[0].attributes, [
      { trait_type: "Kaleidoscope ID", value: 2380 },
      { trait_type: "Art year", value: year },
      { trait_type: "Artist", value: "JP Janssen" },
    ]);
    assert.ok(assets.slice(1).every(a => !a.attributes.some(t => t.trait_type === "Artist")));
  }
});

test("preserves reviewed LUCKYBOSHI derivation without adding membership", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "LUCKYBOSHI";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, response.items.length);
  assert.ok(assets[0].attributes.some(t => t.trait_type === "Based on" && t.value === "LUCKYPEPE"));
  const absent = await load({ fetchJson: async () => structuredClone(fixture), cache: new Map() });
  assert.ok(!absent.some(a => a.asset === "LUCKYBOSHI"));
});

test("preserves reviewed STEALBOBO derivation without adding membership", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "STEALBOBO";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, response.items.length);
  assert.ok(assets[0].attributes.some(t => t.trait_type === "Based on" && t.value === "STEALPEPE"));
  const absent = await load({ fetchJson: async () => structuredClone(fixture), cache: new Map() });
  assert.ok(!absent.some(a => a.asset === "STEALBOBO"));
});

test("preserves reviewed TOKENCLOSED derivation without adding membership", async () => {
  const response = structuredClone(fixture);
  response.items[0].assetName = "TOKENCLOSED";
  const assets = await load({ fetchJson: async () => response, cache: new Map() });
  assert.equal(assets.length, response.items.length);
  assert.ok(assets[0].attributes.some(t => t.trait_type === "Based on" && t.value === "FAKETOKEN"));
  const absent = await load({ fetchJson: async () => structuredClone(fixture), cache: new Map() });
  assert.ok(!absent.some(a => a.asset === "TOKENCLOSED"));
});
