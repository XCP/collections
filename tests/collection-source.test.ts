import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  CollectionValidationError,
  materializeCollection,
  materializeRepository,
  normalizeCollectionMeta,
  normalizeFeedV1,
  readCollectionAssets,
  resolveAggregatorAdapterPath,
  resolveCollectionSource,
  selectedCollectionSlugs,
} from "#lib/collection-source";
import { createFetchJson, createFetchText, FetchJsonError } from "#lib/safe-fetch";
import { parseArguments } from "#scripts/export";

const fixtureDirectory = join(dirname(fileURLToPath(import.meta.url)), "fixtures");
const feed = JSON.parse(readFileSync(join(fixtureDirectory, "feed-v1.json"), "utf8"));
const baseMeta = {
  name: "Example Set",
  kind: "canonical",
  description: "A fixture collection.",
  art_frame: "card",
};
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
