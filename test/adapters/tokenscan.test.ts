import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load, parseTokenscanProject } from "#aggregators/tokenscan";
const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/adapters/tokenscan/project.json", import.meta.url), "utf8"),
);

function loadFixture(fetchJson, secondaryAssets, cache = new Map()) {
  return load({
    collection: "fake-rare",
    config: {
      project: "fake-rare",
      ...(secondaryAssets ? { secondary_assets: secondaryAssets } : {}),
    },
    fetchJson,
    cache,
  });
}

test("uses the direct project API, prefers asset_longname, and marks configured secondary assets", async () => {
  const requested = [];
  const fetchJson = async (url, options) => {
    requested.push({ url, options });
    return structuredClone(fixture);
  };

  const assets = await loadFixture(fetchJson, ["MONAS.NAKAMOTO"]);

  assert.deepEqual(assets, [
    { asset: "FAKEDOSZERO.DOUBLE" },
    { asset: "MONAS.NAKAMOTO", secondary: true },
    { asset: "PEPETHEFAKE.GUCHIFAKE" },
    { asset: "FAKECARD" },
  ]);
  assert.deepEqual(requested, [
    {
      url: "https://tokenscan.io/explorer/project/fake-rare?start=0&length=5000",
      options: { timeoutMs: 20_000, maxBytes: 2_000_000, maxRedirects: 2 },
    },
  ]);
});

test("memoizes the same project response within one export cache", async () => {
  let requests = 0;
  const fetchJson = async () => {
    requests += 1;
    return structuredClone(fixture);
  };
  const adapterCache = new Map();

  await loadFixture(fetchJson, undefined, adapterCache);
  await loadFixture(fetchJson, undefined, adapterCache);
  assert.equal(requests, 1);
});

test("retries a transient project API error without bypassing the bounded fetch helper", async () => {
  let requests = 0;
  const fetchJson = async () => {
    requests += 1;
    if (requests === 1) {
      const error = new Error("HTTP 503");
      error.status = 503;
      error.retryAfterMs = 0;
      throw error;
    }
    return structuredClone(fixture);
  };

  const assets = await loadFixture(fetchJson);
  assert.equal(requests, 2);
  assert.equal(assets.length, 4);
});

test("fails closed on project slug, count, success, and tuple drift", () => {
  const cases = [
    [{ ...fixture, success: false }, /success must be true/],
    [{ ...fixture, project: { ...fixture.project, slug: "another-project" } }, /slug must exactly equal/],
    [{ ...fixture, recordsFiltered: 3 }, /recordsTotal, recordsFiltered, and data length must match/],
    [{ ...fixture, data: [[1, "FAKECARD|", "1"]], recordsTotal: 1, recordsFiltered: 1 }, /six-field tuple/],
    [{ ...fixture, data: [[1, "FAKECARD", "1", "", "", ""]], recordsTotal: 1, recordsFiltered: 1 }, /asset\|asset_longname/],
    [
      {
        ...fixture,
        data: [fixture.data[0], [999, fixture.data[0][1], "1", "", "", ""]],
        recordsTotal: 2,
        recordsFiltered: 2,
      },
      /duplicates asset/,
    ],
    [
      {
        ...fixture,
        data: [
          [1, "A9542895665646507700|PEPETHEFAKE.GUCHIFAKE", "1", "", "", ""],
          [2, "A9542895665646507700|", "1", "", "", ""],
        ],
        recordsTotal: 2,
        recordsFiltered: 2,
      },
      /duplicates compact asset identity/,
    ],
  ];
  for (const [response, pattern] of cases) {
    assert.throws(() => parseTokenscanProject(response, "fake-rare"), pattern);
  }
});

test("rejects configured secondary assets absent from the selected project", async () => {
  await assert.rejects(
    loadFixture(async () => structuredClone(fixture), ["NOTINFEED"]),
    /configured secondary assets are absent/,
  );
});
