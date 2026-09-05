import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load, PEPE_WTF_ASSET_URL } from "#aggregators/pepe-wtf";
const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/adapters/pepe-wtf/rare-coco.json", import.meta.url), "utf8"),
);

async function materialize(response, config = {}, options = {}) {
  return load({
    collection: "rare-coco",
    config: { collection: "rare-coco", ...config },
    fetchJson: async (url, requestOptions) => {
      options.requested?.push({ url, options: requestOptions });
      return structuredClone(response);
    },
    cache: options.adapterCache ?? new Map(),
  });
}

test("maps exact pepe.wtf rows to membership traits and discards chain and market facts", async () => {
  const requested = [];
  const collection = await materialize(
    fixture,
    { secondary_assets: ["COCOGONE"] },
    { requested },
  );

  assert.deepEqual(requested, [
    {
      url: `${PEPE_WTF_ASSET_URL}?collection=rare-coco`,
      options: { timeoutMs: 15_000, maxBytes: 2_000_000, maxRedirects: 2 },
    },
  ]);
  assert.deepEqual(collection, [
    {
      asset: "RARECOCO",
      attributes: [
        { trait_type: "Artist", value: "Kero" },
        { trait_type: "Series", value: 1 },
        { trait_type: "Card", value: 1 },
      ],
    },
    {
      asset: "COCOGONE",
      primary: false,
      attributes: [
        { trait_type: "Series", value: 1 },
        { trait_type: "Card", value: 39 },
      ],
    },
  ]);
});

test("filters other source collections, trims identifiers, and requires explicit exclusions", async () => {
  const response = structuredClone(fixture);
  response[0].name = "  RARECOCO  ";
  response[0].card = null;
  response.push({
    name: "Reserved for somebody",
    collection: "rare-coco",
    artist: null,
    serie: 1,
    card: 40,
  });
  response.push({
    name: "NOTANASSET",
    collection: "some-other-collection",
  });

  await assert.rejects(materialize(response), /not a Counterparty asset identifier/);

  const collection = await materialize(response, {
    excluded_names: ["Reserved for somebody"],
  });
  assert.deepEqual(collection.map(({ asset }) => asset), ["RARECOCO", "COCOGONE"]);
  assert.deepEqual(collection[0].attributes, [
    { trait_type: "Artist", value: "Kero" },
    { trait_type: "Series", value: 1 },
  ]);
});

test("caches one bounded request per collection and export", async () => {
  let requests = 0;
  const adapterCache = new Map();
  const fetchJson = async () => {
    requests += 1;
    return structuredClone(fixture);
  };

  await load({ collection: "rare-coco", config: {}, fetchJson, cache: adapterCache });
  await load({ collection: "rare-coco", config: {}, fetchJson, cache: adapterCache });
  assert.equal(requests, 1);
});

test("fails closed on empty, mismatched, malformed, duplicate, and stale provider data", async () => {
  assert.equal(await materialize([]), undefined);
  assert.equal(
    await materialize([{ name: "OTHERPEPE", collection: "other", artist: null, serie: 1, card: 1 }]),
    undefined,
  );

  const badArtist = structuredClone(fixture);
  badArtist[0].artist = "Kero";
  await assert.rejects(materialize(badArtist), /artist must be an object or null/);

  const badSeries = structuredClone(fixture);
  badSeries[0].serie = "1";
  await assert.rejects(materialize(badSeries), /serie must be a non-negative integer/);

  const duplicate = structuredClone(fixture);
  duplicate.push(structuredClone(duplicate[0]));
  await assert.rejects(materialize(duplicate), /repeats name "RARECOCO"/);

  await assert.rejects(
    materialize(fixture, { excluded_names: ["ABSENT ROW"] }),
    /configured excluded names are absent/,
  );
  await assert.rejects(
    materialize(fixture, { secondary_assets: ["NOTINFEED"] }),
    /configured secondary assets are absent/,
  );
});
