import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  CollectionValidationError,
  applyCounterpartyFallback,
  materializeCollection,
  materializeRepository,
  normalizeCollectionMeta,
  blockedCreditIssues,
  artistSpellingIssues,
  basedOnIssues,
  normalizeAssets,
  numericAssetIssues,
  normalizeFeedV1,
  readCollectionAssets,
  resolveAggregatorAdapterPath,
  resolveCollectionSource,
  selectedCollectionSlugs,
  validateMemberships,
} from "#lib/collection-source";
import { createFetchJson, createFetchText, FetchJsonError } from "#lib/safe-fetch";
import { parseArguments, runExport } from "#scripts/export";

const fixtureDirectory = join(dirname(fileURLToPath(import.meta.url)), "fixtures");
const feed = JSON.parse(readFileSync(join(fixtureDirectory, "feed-v1.json"), "utf8"));
const baseMeta = {
  name: "Example Set",
  kind: "canonical",
  description: "A fixture collection.",
  art_frame: "card",
};

test("feed exports preserve currency classification and reject misspellings", () => {
  const input = { schema_version: 1, collection: "rare-pepe", assets: [
    { asset: "PEPECASH", asset_type: "currency" },
    { asset: "PEPEGUN", asset_type: "collectible" },
    { asset: "RAREPEPE" },
  ] };
  assert.deepEqual(normalizeFeedV1(input).assets, input.assets);
  for (const asset_type of ["Currency", "curreny", null, 1]) {
    assert.throws(() => normalizeFeedV1({ ...input, assets: [{ asset: "PEPECASH", asset_type }] }), /asset_type/);
  }
});
function makeRepository(slug = "example-set") {
  const root = mkdtempSync(join(tmpdir(), "counterparty-collection-layout-"));
  const directory = join(root, "collections", slug);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "meta.json"), `${JSON.stringify(baseMeta, null, 2)}\n`);
  return { root, directory };
}

test("assets.json has precedence over a collection adapter", async (t) => {
  const { root, directory } = makeRepository();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(directory, "assets.json"), `${JSON.stringify({ assets: feed.assets }, null, 2)}\n`);
  writeFileSync(join(directory, "adapter.ts"), 'export async function load() { throw new Error("must not run"); }\n');

  assert.deepEqual(resolveCollectionSource(root, "example-set").type, "static");
  assert.deepEqual(readCollectionAssets(root, "example-set"), feed.assets);
  const collection = await materializeCollection({ slug: "example-set", meta: baseMeta, repositoryRoot: root });
  assert.deepEqual(collection.assets, feed.assets);
  assert.deepEqual(collection.assets[0].attributes.map(({ value }) => value), ["Alice", "Bob", 1]);
});

test("a collection adapter is used only when assets.json is absent", async (t) => {
  const { root, directory } = makeRepository();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(
    join(directory, "adapter.ts"),
    `export async function load() { return ${JSON.stringify(feed.assets)}; }\n`,
  );
  assert.equal(resolveCollectionSource(root, "example-set").type, "collection-adapter");
  const collection = await materializeCollection({ slug: "example-set", meta: baseMeta, repositoryRoot: root });
  assert.deepEqual(collection.assets, feed.assets);
});

test("switching from JSON to an unavailable API preserves the last complete export", async (t) => {
  const { root, directory } = makeRepository();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const snapshot = join(directory, "assets.json");
  const assets = [{ asset: 'EXAMPLECARD' }];
  writeFileSync(snapshot, JSON.stringify({ assets }));
  const outputPath = join(root, "dist", "collections.json");
  const args = ["--root", root, "--output", outputPath];
  assert.ok(await runExport(args));
  const previous = readFileSync(outputPath, "utf8");
  writeFileSync(join(directory, "adapter.ts"), 'export async function load() { throw new Error("upstream unavailable"); }\n');
  rmSync(snapshot);
  const exitCode = process.exitCode;
  try {
    assert.equal(await runExport(args), undefined);
    assert.equal(process.exitCode, 1);
    assert.equal(readFileSync(outputPath, "utf8"), previous);
  } finally {
    process.exitCode = exitCode;
  }
  // A reviewed source switch recovers independently of the broken API.
  writeFileSync(snapshot, JSON.stringify({ assets }));
  assert.ok(await runExport(args));
  assert.equal(readFileSync(outputPath, "utf8"), previous);
});

test("Bitcoin Stamps is the only metadata-only collection special case", async (t) => {
  const { root, directory } = makeRepository("bitcoin-stamps");
  t.after(() => rmSync(root, { recursive: true, force: true }));

  assert.equal(resolveCollectionSource(root, "bitcoin-stamps").type, "metadata-only");
  const derived = await materializeCollection({
    slug: "bitcoin-stamps",
    meta: baseMeta,
    repositoryRoot: root,
  });
  assert.equal(derived.slug, "bitcoin-stamps");
  assert.equal(derived.assets, undefined);

  writeFileSync(join(directory, "assets.json"), JSON.stringify({ assets: feed.assets }));
  assert.equal(resolveCollectionSource(root, "bitcoin-stamps").type, "static");
});

test("aggregators are the last convention and ambiguity fails closed", async (t) => {
  const { root } = makeRepository();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const first = join(root, "aggregators", "first");
  mkdirSync(first, { recursive: true });
  writeFileSync(join(first, "adapter.ts"), `export async function load() { return ${JSON.stringify(feed.assets)}; }\n`);
  assert.equal(resolveCollectionSource(root, "example-set").type, "aggregator");
  const collection = await materializeCollection({ slug: "example-set", meta: baseMeta, repositoryRoot: root });
  assert.deepEqual(collection.assets, feed.assets);

  const second = join(root, "aggregators", "second");
  mkdirSync(second, { recursive: true });
  writeFileSync(join(second, "adapter.ts"), `export async function load() { return ${JSON.stringify(feed.assets)}; }\n`);
  await assert.rejects(
    materializeCollection({ slug: "example-set", meta: baseMeta, repositoryRoot: root }),
    /multiple aggregators/,
  );
});

test("malformed standard feeds fail closed", () => {
  const cases = [
    { ...feed, schema_version: 2 },
    { ...feed, collection: "somewhere-else" },
    { ...feed, unexpected: true },
    { ...feed, assets: [feed.assets[0], feed.assets[0]] },
    { ...feed, assets: [{ asset: "A1" }] },
    { ...feed, assets: [{ asset: "RAREPEPE", primary: "yes" }] },
  ];
  for (const invalidFeed of cases) {
    assert.throws(() => normalizeFeedV1(invalidFeed, "example-set"), CollectionValidationError);
  }
});

test("named assets, numeric assets, and subasset longnames are equally valid identifiers", () => {
  const identifiers = [
    { asset: "RAREPEPE" },
    { asset: "A9538869118141223875" },
    { asset: "DANK.COOKIES" },
  ];
  const normalized = normalizeFeedV1(
    { schema_version: 1, collection: "example-set", assets: identifiers },
    "example-set",
  );
  assert.deepEqual(normalized.assets, identifiers);
});

test("meta.json rejects embedded membership and source configuration", () => {
  for (const [key, value] of [
    ["assets", feed.assets],
    ["feed", { url: "https://collection.example/feed.json" }],
    ["adapter", { name: "example" }],
    ["where", { issued_before_block: 100 }],
  ]) {
    assert.throws(() => normalizeCollectionMeta({ ...baseMeta, [key]: value }, "example-set"), /unknown key/);
  }
});

test("meta.json accepts only the standard collection art frames", () => {
  assert.deepEqual(
    normalizeCollectionMeta({ ...baseMeta, art_frame: "landscape" }, "example-set"),
    { ...baseMeta, art_frame: "landscape" },
  );
  assert.throws(
    () => normalizeCollectionMeta({ ...baseMeta, art_frame: "cinematic" }, "example-set"),
    /must be "card", "square", or "landscape"/,
  );
  const { art_frame: _artFrame, ...missingArtFrame } = baseMeta;
  assert.throws(
    () => normalizeCollectionMeta(missingArtFrame, "example-set"),
    /must be "card", "square", or "landscape"/,
  );
});

test("meta.json accepts an optional founding year within the Counterparty era", () => {
  assert.deepEqual(
    normalizeCollectionMeta({ ...baseMeta, founded: 2018 }, "example-set"),
    { ...baseMeta, founded: 2018 },
  );
  assert.deepEqual(normalizeCollectionMeta(baseMeta, "example-set"), baseMeta);
  for (const founded of [2013, 2101, 2018.5, "2018", null]) {
    assert.throws(
      () => normalizeCollectionMeta({ ...baseMeta, founded }, "example-set"),
      /must be an integer year from 2014 to 2100/,
    );
  }
});

test("a Based on trait must name another registered asset", () => {
  const based = (value: unknown) => ({ asset: "BOOTLEGPEPE.DJPEPE", attributes: [{ trait_type: "Based on", value }] });
  const collections = (entry: object) => [
    { slug: "rare-pepe", assets: [{ asset: "DJPEPE" }] },
    { slug: "bootleg-pepe", assets: [entry] },
  ];
  assert.deepEqual(basedOnIssues(collections(based("DJPEPE"))), []);
  assert.match(basedOnIssues(collections(based("NOTLISTED")))[0], /not in the registry/);
  assert.match(basedOnIssues(collections(based("djpepe")))[0], /must name a Counterparty asset/);
  assert.match(basedOnIssues(collections(based("BOOTLEGPEPE.DJPEPE")))[0], /cannot be based on itself/);
});

test("variation_of marks a canonical collection as one parent's alternate versions", async (t) => {
  assert.deepEqual(
    normalizeCollectionMeta({ ...baseMeta, variation_of: "BEARFACTS" }, "example-set"),
    { ...baseMeta, variation_of: "BEARFACTS" },
  );
  for (const variation_of of ["bearfacts", "BEARFACTS.misprint", "", 7]) {
    assert.throws(
      () => normalizeCollectionMeta({ ...baseMeta, variation_of }, "example-set"),
      /must be a named or numeric Counterparty asset id/,
    );
  }
  assert.throws(
    () => normalizeCollectionMeta({ ...baseMeta, kind: "curated", variation_of: "BEARFACTS" }, "example-set"),
    /requires kind "canonical"/,
  );

  const meta = { ...baseMeta, variation_of: "BEARFACTS" };
  const valid = makeRepository();
  t.after(() => rmSync(valid.root, { recursive: true, force: true }));
  writeFileSync(join(valid.directory, "assets.json"), JSON.stringify({
    assets: [{ asset: "BEARFACTS", primary: false }, { asset: "BEARFACTS.misprint" }],
  }));
  const collection = await materializeCollection({ slug: "example-set", meta, repositoryRoot: valid.root });
  assert.equal(collection.variation_of, "BEARFACTS");

  const missingParent = makeRepository();
  t.after(() => rmSync(missingParent.root, { recursive: true, force: true }));
  writeFileSync(join(missingParent.directory, "assets.json"), JSON.stringify({ assets: [{ asset: "BEARFACTS.misprint" }] }));
  await assert.rejects(
    materializeCollection({ slug: "example-set", meta, repositoryRoot: missingParent.root }),
    /must list its parent BEARFACTS/,
  );

  const stray = makeRepository();
  t.after(() => rmSync(stray.root, { recursive: true, force: true }));
  writeFileSync(join(stray.directory, "assets.json"), JSON.stringify({
    assets: [{ asset: "BEARFACTS", primary: false }, { asset: "BEARFACTS.misprint" }, { asset: "OTHERCARD" }],
  }));
  await assert.rejects(
    materializeCollection({ slug: "example-set", meta, repositoryRoot: stray.root }),
    /may only contain its subassets; found OTHERCARD/,
  );
});

test("canonical static collections require a primary asset while curated overlaps may be all-secondary", async (t) => {
  const secondaryOnly = [{ asset: "CROSSCARD", primary: false }];
  const canonical = makeRepository();
  t.after(() => rmSync(canonical.root, { recursive: true, force: true }));
  writeFileSync(join(canonical.directory, "assets.json"), JSON.stringify({ assets: secondaryOnly }));
  await assert.rejects(
    materializeCollection({
      slug: "example-set",
      meta: baseMeta,
      repositoryRoot: canonical.root,
    }),
    /at least one unflagged primary asset/,
  );
  const curatedRepo = makeRepository();
  t.after(() => rmSync(curatedRepo.root, { recursive: true, force: true }));
  writeFileSync(join(curatedRepo.directory, "assets.json"), JSON.stringify({ assets: secondaryOnly }));
  const curated = await materializeCollection({
    slug: "example-set",
    meta: {
      name: "Curated overlap",
      kind: "curated",
      description: "A fixture view.",
      art_frame: "card",
    },
    repositoryRoot: curatedRepo.root,
  });
  assert.deepEqual(curated.assets, secondaryOnly);
});

test("only a variations collection may list every entry as secondary", async (t) => {
  const secondaryOnly = [{ asset: "BEARFACTS", primary: false }, { asset: "BEARFACTS.misprint", primary: false }];
  const variations = makeRepository();
  t.after(() => rmSync(variations.root, { recursive: true, force: true }));
  writeFileSync(join(variations.directory, "assets.json"), JSON.stringify({ assets: secondaryOnly }));
  const collection = await materializeCollection({
    slug: "example-set",
    meta: { ...baseMeta, variation_of: "BEARFACTS" },
    repositoryRoot: variations.root,
  });
  assert.deepEqual(collection.assets, secondaryOnly);

  const ordinary = makeRepository();
  t.after(() => rmSync(ordinary.root, { recursive: true, force: true }));
  writeFileSync(join(ordinary.directory, "assets.json"), JSON.stringify({ assets: secondaryOnly }));
  await assert.rejects(
    materializeCollection({ slug: "example-set", meta: baseMeta, repositoryRoot: ordinary.root }),
    /at least one unflagged primary asset/,
  );
});

test("an open collection adapter demotes only its conflicting memberships", async (t) => {
  const { root, directory } = makeRepository();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(
    join(directory, "assets.json"),
    JSON.stringify({ assets: [{ asset: "RAREPEPE" }] }),
  );

  const openDirectory = join(root, "collections", "open-set");
  mkdirSync(openDirectory, { recursive: true });
  writeFileSync(
    join(openDirectory, "meta.json"),
    JSON.stringify({ ...baseMeta, name: "Open Set" }),
  );
  writeFileSync(
    join(openDirectory, "adapter.ts"),
    'export const overlapPolicy = "secondary";\n' +
      'export async function load() { return [{ asset: "RAREPEPE" }, { asset: "OPENONLY" }]; }\n',
  );

  const result = await materializeRepository({ repositoryRoot: root });
  const open = result.collections.find(({ slug }) => slug === "open-set");
  assert.deepEqual(open.assets, [
    { asset: "RAREPEPE", primary: false },
    { asset: "OPENONLY" },
  ]);
  assert.deepEqual(result.counts, { primaryMemberships: 2, secondaryMemberships: 1 });
});

test("aggregator folder names cannot traverse their root", () => {
  const aggregatorsDirectory = join(fixtureDirectory, "aggregators");
  for (const name of ["../escape", "nested/escape", "nested\\escape", ".", "C:\\escape"]) {
    assert.throws(() => resolveAggregatorAdapterPath(aggregatorsDirectory, name), CollectionValidationError);
  }
  assert.equal(
    resolveAggregatorAdapterPath(aggregatorsDirectory, "example"),
    join(aggregatorsDirectory, "example", "adapter.ts"),
  );
});

test("safe fetch is HTTPS-only by default and bounds response size", async () => {
  let called = false;
  const fetchJson = createFetchJson({
    maxBytes: 8,
    fetchImpl: async () => {
      called = true;
      return new Response('{"value":123}', { headers: { "content-type": "application/json" } });
    },
  });

  await assert.rejects(fetchJson("http://collection.example/feed.json"), FetchJsonError);
  assert.equal(called, false);
  await assert.rejects(fetchJson("https://collection.example/feed.json"), /larger than the 8-byte limit/);
});

test("safe fetch requires the declared response content type", async () => {
  const fetchJson = createFetchJson({
    fetchImpl: async () => new Response(null),
  });
  await assert.rejects(fetchJson("https://collection.example/feed.json"), /received no Content-Type/);
});

test("safe text fetch accepts bounded JavaScript source without evaluating it", async () => {
  let request;
  const fetchText = createFetchText({
    fetchImpl: async (url, options) => {
      request = { url: url.href, accept: options.headers.accept };
      return new Response("PUBLIC_DATA = [];", {
        headers: { "content-type": "text/javascript; charset=utf-8" },
      });
    },
  });

  assert.equal(await fetchText("https://collection.example/directory.js"), "PUBLIC_DATA = [];");
  assert.equal(request.url, "https://collection.example/directory.js");
  assert.match(request.accept, /javascript/);
  await assert.rejects(
    fetchText("https://collection.example/directory.js", { method: "POST" }),
    /unknown fetchText option/,
  );
});

test("safe fetch rejects localhost and local/private IP literals before requesting them", async () => {
  let requests = 0;
  const fetchText = createFetchText({
    fetchImpl: async () => {
      requests += 1;
      return new Response("not reached", { headers: { "content-type": "text/plain" } });
    },
  });
  const blocked = [
    "https://localhost/data",
    "https://api.localhost/data",
    "https://127.0.0.1/data",
    "https://[::1]/data",
    "https://0.0.0.0/data",
    "https://169.254.12.34/data",
    "https://10.20.30.40/data",
    "https://172.16.0.1/data",
    "https://172.31.255.254/data",
    "https://192.168.1.1/data",
    "https://[fc00::1]/data",
    "https://[fe80::1]/data",
  ];

  for (const url of blocked) {
    await assert.rejects(fetchText(url), /local and private network targets are not allowed/);
  }
  assert.equal(requests, 0);
});

test("safe fetch follows only the configured number of validated redirects", async () => {
  let requests = 0;
  const fetchJson = createFetchJson({
    maxRedirects: 1,
    fetchImpl: async () => {
      requests += 1;
      return new Response(null, {
        status: 302,
        headers: { location: "https://collection.example/again" },
      });
    },
  });
  await assert.rejects(fetchJson("https://collection.example/feed.json"), /too many redirects/);
  assert.equal(requests, 2);
});

test("safe fetch exposes bounded HTTP retry metadata to adapters", async () => {
  const fetchJson = createFetchJson({
    fetchImpl: async () =>
      new Response("slow down", {
        status: 429,
        headers: { "content-type": "text/plain", "retry-after": "2" },
      }),
  });

  await assert.rejects(fetchJson("https://collection.example/feed.json"), (error) => {
    assert.ok(error instanceof FetchJsonError);
    assert.equal(error.status, 429);
    assert.equal(error.retryAfterMs, 2_000);
    assert.equal(error.url, "https://collection.example/feed.json");
    return true;
  });
});

test("--root also relocates the default export artifact", () => {
  const customRoot = join(fixtureDirectory, "custom-root");
  const options = parseArguments(["--root", customRoot], join(fixtureDirectory, "original"));
  assert.equal(options.repositoryRoot, customRoot);
  assert.equal(options.outputPath, join(customRoot, "dist", "collections.json"));
});

test("partial exports select only known collection folders", () => {
  const root = join(fixtureDirectory, "selection-root");
  mkdirSync(join(root, "collections", "alpha"), { recursive: true });
  mkdirSync(join(root, "collections", "beta"), { recursive: true });
  try {
    assert.deepEqual(selectedCollectionSlugs(root, ["beta"]), {
      slugs: ["beta"],
      complete: false,
    });
    assert.throws(() => selectedCollectionSlugs(root, ["missing"]), /unknown collection slugs/);
    assert.throws(() => selectedCollectionSlugs(root, ["alpha", "alpha"]), /duplicates/);
    assert.deepEqual(parseArguments(["--root", root, "--include", "beta,alpha"]).includeSlugs, [
      "beta",
      "alpha",
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the public JSON schemas are valid JSON", () => {
  for (const name of [
    "feed-v1.schema.json",
    "collection-meta.schema.json",
    "assets.schema.json",
  ]) {
    assert.doesNotThrow(() => JSON.parse(readFileSync(join(fixtureDirectory, "..", "..", "schemas", name), "utf8")));
  }
});

test("an Artist trait may not be a Bitcoin address", () => {
  for (const value of ["1JDogZS6tQcSxwfxhv6XKKjcyicYA4Feev", "bc1qtsenny4t24882u7l854yzt0h2znq686mwhf2mt"]) {
    assert.throws(
      () => normalizeAssets([{ asset: "RAREPEPE", attributes: [{ trait_type: "Artist", value }] }]),
      (error) => error instanceof CollectionValidationError && /not a Bitcoin address/.test(error.message),
    );
  }
  assert.deepEqual(
    normalizeAssets([{ asset: "RAREPEPE", attributes: [{ trait_type: "Artist", value: "Rare Scrilla" }] }])[0].attributes,
    [{ trait_type: "Artist", value: "Rare Scrilla" }],
  );
});

test("a subasset is listed by longname, and every numeric id is a known plain numeric asset", (t) => {
  const root = mkdtempSync(join(tmpdir(), "numeric-assets-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "data"));
  writeFileSync(join(root, "data", "numeric-assets.json"), JSON.stringify({ A95428957753448833: null, A14280199102303321034: "BLUEBEAR.AOIKUMA" }));
  const collections = [
    { slug: "plain", assets: [{ asset: "A95428957753448833" }, { asset: "RAREPEPE" }, { asset: "BLUEBEAR.AOIKUMA" }] },
    { slug: "subasset-by-id", assets: [{ asset: "A14280199102303321034" }] },
    { slug: "unknown", assets: [{ asset: "A11111111111111111111" }] },
  ];
  assert.deepEqual(numericAssetIssues(root, collections), [
    "subasset-by-id: A14280199102303321034 is the subasset BLUEBEAR.AOIKUMA; list it by that longname",
    "unknown: A11111111111111111111 is not in data/numeric-assets.json; run npm run numeric:resolve",
  ]);
});

test("blocked artist credits are rejected case-insensitively", (t) => {
  const root = mkdtempSync(join(tmpdir(), "blocked-credits-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "data"));
  writeFileSync(join(root, "data", "blocked-artist-credits.json"), JSON.stringify({ credits: ["unknown", "hairpepe"] }));
  const collections = [{ slug: "cards", assets: [
    { asset: "HAIRPEPE", attributes: [{ trait_type: "Artist", value: "Hairpepe" }] },
    { asset: "PEPECASH", attributes: [{ trait_type: "Artist", value: " UNKNOWN " }] },
    { asset: "RAREPEPE", attributes: [{ trait_type: "Artist", value: "Rare Scrilla" }, { trait_type: "Card", value: "Unknown" }] },
  ] }];
  assert.deepEqual(blockedCreditIssues(root, collections).map((issue) => issue.split(" credits")[0]), ["cards: HAIRPEPE", "cards: PEPECASH"]);
});

test("Counterparty accepts primary homes but rejects secondary memberships even in partial exports", () => {
  const counterparty = { slug: "counterparty", kind: "canonical", assets: [{ asset: "MAGATAMABL" }] };
  const project = { slug: "magatama", kind: "canonical", assets: [{ asset: "MAGATAMABL", primary: false }] };
  assert.throws(() => validateMemberships([counterparty, project]), /Counterparty membership must be exclusive/);
  counterparty.assets[0].primary = false;
  delete project.assets[0].primary;
  assert.throws(() => validateMemberships([counterparty, project]), /Counterparty is a primary-only catch-all/);
  assert.throws(() => validateMemberships([counterparty], { requirePrimaryForSecondary: false }), /Counterparty is a primary-only catch-all/);
});

test("Counterparty adapter refresh cannot restore secondary memberships", async (t) => {
  const { root, directory } = makeRepository("counterparty");
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(directory, "adapter.ts"), 'export async function load() { return [{ asset: "STANDALONE" }, { asset: "MAGATAMABL", primary: false }]; }\n');
  await assert.rejects(materializeRepository({ repositoryRoot: root, includeSlugs: ["counterparty"] }), /Counterparty is a primary-only catch-all/);
});

test("Counterparty yields to adapter membership while preserving artists and standalone entries", async (t) => {
  const { root, directory } = makeRepository("counterparty");
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(directory, "assets.json"), JSON.stringify({ assets: [
    { asset: "STANDALONE", attributes: [{ trait_type: "Artist", value: "Alice" }] },
    { asset: "SHARED", attributes: [{ trait_type: "Artist", value: "Alice" }, { trait_type: "Art year", value: 2021 }] },
  ] }));
  const project = join(root, "collections", "project");
  mkdirSync(project);
  writeFileSync(join(project, "meta.json"), JSON.stringify(baseMeta));
  writeFileSync(join(project, "adapter.ts"), 'export const overlapPolicy = "secondary"; export async function load() { return [{ asset: "SHARED", attributes: [{ trait_type: "Artist", value: "Bob" }, { trait_type: "Card", value: 3 }] }]; }');
  for (let refresh = 0; refresh < 2; refresh++) {
    const { collections, counts } = await materializeRepository({ repositoryRoot: root });
    assert.deepEqual(collections.find(c => c.slug === "counterparty").assets.map(a => a.asset), ["STANDALONE"]);
    const moved = collections.find(c => c.slug === "project").assets[0];
    assert.notEqual(moved.primary, false);
    assert.deepEqual(moved.attributes, [
      { trait_type: "Artist", value: "Bob" }, { trait_type: "Card", value: 3 },
      { trait_type: "Artist", value: "Alice" }, { trait_type: "Art year", value: 2021 },
    ]);
    assert.deepEqual(counts, { primaryMemberships: 2, secondaryMemberships: 0 });
  }
});

test("Counterparty fallback preserves project traits and rejects a curated-only replacement", () => {
  const collections = [
    { slug: "counterparty", kind: "canonical", assets: [{ asset: "SHARED", attributes: [{ trait_type: "Artist", value: "Alice" }, { trait_type: "Card", value: 1 }] }] },
    { slug: "project", kind: "canonical", assets: [{ asset: "SHARED", primary: false, attributes: [{ trait_type: "Artist", value: "Alice" }, { trait_type: "Card", value: 2 }] }] },
  ];
  applyCounterpartyFallback(collections);
  assert.deepEqual(collections[0].assets, []);
  assert.deepEqual(collections[1].assets[0].attributes, [{ trait_type: "Artist", value: "Alice" }, { trait_type: "Card", value: 2 }]);
  assert.deepEqual(validateMemberships(collections), { primaryMemberships: 1, secondaryMemberships: 0 });
  assert.throws(() => applyCounterpartyFallback([
    { slug: "counterparty", kind: "canonical", assets: [{ asset: "SHARED" }] },
    { slug: "gallery", kind: "curated", assets: [{ asset: "SHARED" }] },
  ]), /canonical home/);
});

test("one artist has one spelling across the registry", () => {
  const credit = (asset, value) => ({ asset, attributes: [{ trait_type: "Artist", value }] });
  const issues = artistSpellingIssues([
    { slug: "one", assets: [credit("AAA", "Crypto Ali"), credit("BBB", "Rare Scrilla")] },
    { slug: "two", assets: [credit("CCC", "CryptoAli"), credit("DDD", "Rare Scrilla")] },
  ]);
  assert.equal(issues.length, 1);
  assert.match(issues[0], /"Crypto Ali" \(one: AAA\) and "CryptoAli" \(two: CCC\)/);
});

test("Art year is one integer year and Based on appears at most once", () => {
  const entry = (attributes) => [{ asset: "RAREPEPE", attributes }];
  assert.deepEqual(normalizeAssets(entry([{ trait_type: "Art year", value: 2021 }]))[0].attributes, [{ trait_type: "Art year", value: 2021 }]);
  for (const value of ["2021", 2021.5, 1999, 3000]) {
    assert.throws(() => normalizeAssets(entry([{ trait_type: "Art year", value }])), CollectionValidationError);
  }
  for (const trait_type of ["Art year", "Based on"]) {
    const value = trait_type === "Art year" ? 2021 : "PEPECASH";
    assert.throws(
      () => normalizeAssets(entry([{ trait_type, value }, { trait_type, value }])),
      (error) => error instanceof CollectionValidationError && /at most one/.test(error.message),
    );
  }
});

test("reviewed assets.json omits primary: true and empty attributes", (t) => {
  for (const [assets, message] of [
    [[{ asset: "RAREPEPE", primary: true }], /omit primary: true/],
    [[{ asset: "RAREPEPE", attributes: [] }], /omit an empty attributes array/],
  ]) {
    const { root, directory } = makeRepository();
    t.after(() => rmSync(root, { recursive: true, force: true }));
    writeFileSync(join(directory, "assets.json"), JSON.stringify({ assets }));
    assert.throws(() => readCollectionAssets(root, "example-set"), (error) => error instanceof CollectionValidationError && message.test(error.message));
  }
});

test("a project claiming fallback art is told to remove the fallback entry", () => {
  for (const order of [["counterparty", "a-project"], ["a-project", "counterparty"]]) {
    const collections = order.map((slug) => ({ slug, kind: "canonical", assets: [{ asset: "PEPEBOY" }] }));
    assert.throws(
      () => validateMemberships(collections),
      (error) => error instanceof CollectionValidationError && /PEPEBOY is now listed by a-project; remove it from collections\/counterparty\/assets\.json/.test(error.message),
    );
  }
  assert.throws(
    () => validateMemberships(["one", "two"].map((slug) => ({ slug, kind: "canonical", assets: [{ asset: "PEPEBOY" }] }))),
    (error) => error instanceof CollectionValidationError && /two primary memberships: one and two/.test(error.message),
  );
});

test('Based on defers absent adapter targets but still rejects invalid and self references', () => {
  const entries = value => [{slug:'example',assets:[{asset:'BOOTLEGPEPE',attributes:[{trait_type:'Based on',value}]}]}];
  assert.deepEqual(basedOnIssues(entries('PUTIN'), {requireRegistered:false}), []);
  assert.match(basedOnIssues(entries('PUTIN'))[0], /not in the registry/);
  assert.match(basedOnIssues(entries('invalid'), {requireRegistered:false})[0], /must name/);
  assert.match(basedOnIssues(entries('BOOTLEGPEPE'), {requireRegistered:false})[0], /itself/);
});

test("project date precision preserves months and rejects invented or conflicting dates", () => {
  for (const founded_date of ["2016-09", "2016-02-29", "2016-12-27"]) {
    assert.equal(normalizeCollectionMeta({ ...baseMeta, founded: 2016, founded_date }, "example-set").founded_date, founded_date);
  }
  for (const founded_date of ["2015-09", "2016-13", "2016-02-30", "2016-04-31", "2016-1", "2016-01-01T00:00:00Z", null]) {
    assert.throws(() => normalizeCollectionMeta({ ...baseMeta, founded: 2016, founded_date }, "example-set"));
  }
  assert.throws(() => normalizeCollectionMeta({ ...baseMeta, founded_date: "2016-09" }, "example-set"));
});
