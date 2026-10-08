import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { load } from "#collections/hondacivic-garage";

const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/collections/hondacivic-garage/mint.json", import.meta.url), "utf8"),
);

function serve(response) {
  const requested = [];
  return {
    requested,
    fetchJson: async (url, options) => {
      requested.push({ url, options });
      return structuredClone(response);
    },
  };
}

test("reads delivered cards from the garage API with Series/Card from the card identity", async () => {
  const { requested, fetchJson } = serve(fixture);
  const assets = await load({ collection: "hondacivic-garage", fetchJson, cache: new Map() });

  assert.equal(requested.length, 1);
  assert.equal(requested[0].url, "https://milliondollarbillboard.net/api/garage/mint");
  assert.deepEqual(
    assets.map((entry) => entry.asset),
    ["HONDACIVIC.S1.0001", "HONDACIVIC.S1.0002", "HONDACIVIC.S1.0006"],
  );

  const legend = assets[2];
  assert.deepEqual(legend.attributes.slice(0, 5), [
    { trait_type: "Series", value: 1 },
    { trait_type: "Card", value: 6 },
    { trait_type: "Edition", value: "Legend 1/1 · Season 1" },
    { trait_type: "Car", value: "VIN-DIESEL" },
    { trait_type: "VIN", value: "2" },
  ]);
  const types = legend.attributes.map((attribute) => attribute.trait_type);
  for (const derived of ["Season", "Mint number", "Minted at block"]) assert.ok(!types.includes(derived));
  assert.deepEqual(
    legend.attributes.filter((attribute) => attribute.trait_type === "First pull").map((attribute) => attribute.value),
    ["Junkyard door · Oxblood", "WANGAN", "Underglow · Cyan"],
  );
});

test("omits pulled cards that are not yet delivered on Counterparty", async () => {
  const response = structuredClone(fixture);
  const pending = structuredClone(response.gallery[0]);
  pending.asset = "HONDACIVIC.S1.0007";
  pending.mint_no = 7;
  pending.status = "pending";
  pending.attributes = pending.attributes.map((attribute) =>
    attribute.trait_type === "Mint number" ? { ...attribute, value: "#7" } : attribute,
  );
  response.gallery.unshift(pending);
  response.stats.pulled = 4;

  const assets = await load({ fetchJson: serve(response).fetchJson, cache: new Map() });
  assert.ok(!assets.some((entry) => entry.asset === "HONDACIVIC.S1.0007"));
  assert.equal(assets.length, 3);
});

test("fails closed on a truncated gallery", async () => {
  const response = structuredClone(fixture);
  response.stats.pulled = 4;
  await assert.rejects(load({ fetchJson: serve(response).fetchJson }), /lists 3 of 4 pulled cards/);
});

test("fails closed when the identity and the card's own fields disagree", async () => {
  const response = structuredClone(fixture);
  response.gallery[0].mint_no = 7;
  await assert.rejects(load({ fetchJson: serve(response).fetchJson }), /mint_no disagrees/);

  const renamed = structuredClone(fixture);
  renamed.gallery[0].asset = "HONDACIVIC.TUNER";
  await assert.rejects(load({ fetchJson: serve(renamed).fetchJson }), /is not a HONDACIVIC/);
});

test("accepts delivered cards from every listed season", async () => {
  const response = structuredClone(fixture);
  response.season = 2;
  response.rules.edition_seasons = [1, 2];
  const next = structuredClone(response.gallery[0]);
  next.asset = "HONDACIVIC.S2.0001";
  next.season = 2;
  next.mint_no = 1;
  next.attributes = next.attributes.map((attribute) => {
    if (attribute.trait_type === "Season") return { ...attribute, value: "2" };
    if (attribute.trait_type === "Mint number") return { ...attribute, value: "#1" };
    return attribute;
  });
  response.gallery.unshift(next);
  response.stats.pulled = 4;
  response.stats.delivered = 4;

  const assets = await load({ fetchJson: serve(response).fetchJson });
  assert.deepEqual(
    assets.map((entry) => entry.asset),
    ["HONDACIVIC.S1.0001", "HONDACIVIC.S1.0002", "HONDACIVIC.S1.0006", "HONDACIVIC.S2.0001"],
  );
  assert.deepEqual(assets[3].attributes.slice(0, 2), [
    { trait_type: "Series", value: 2 },
    { trait_type: "Card", value: 1 },
  ]);

  response.rules.edition_seasons = [2];
  await assert.rejects(load({ fetchJson: serve(response).fetchJson }), /season 1 is not in/);
});

test("fails closed on a malformed response", async () => {
  await assert.rejects(load({ fetchJson: serve({ error: "Failed to load" }).fetchJson }), /response\.rules/);
  const response = structuredClone(fixture);
  response.gallery = {};
  await assert.rejects(load({ fetchJson: serve(response).fetchJson }), /gallery must be an array/);
});

test("reads the season from the card name when the API omits it", async () => {
  const response = structuredClone(fixture);
  for (const card of response.gallery) delete card.season;
  const assets = await load({ fetchJson: serve(response).fetchJson, cache: new Map() });
  assert.ok(assets.length > 0 && assets.every((entry) => entry.attributes.some((t) => t.trait_type === "Series" && t.value === 1)));
})

test("keeps Series, Card, Car and Tier when gallery cards omit the attribute list", async () => {
  const response = structuredClone(fixture);
  for (const card of response.gallery) {
    delete card.attributes;
    delete card.season;
    card.car = "VIN-DIESEL";
    card.tier_label = "Legend";
  }
  const assets = await load({ fetchJson: serve(response).fetchJson, cache: new Map() });
  assert.deepEqual(assets[0].attributes.map((t) => t.trait_type), ["Series", "Card", "Car", "Tier"]);
});
