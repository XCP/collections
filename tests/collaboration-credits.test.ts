import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { normalizeAssets, materializeRepository, readArtistCreditSplits, applyArtistCreditSplits } from '#lib/collection-source';

const root = new URL('../', import.meta.url);
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const review = read('data/collaboration-credits.json');

test('reviewed collaborations survive normalization as ordered individual Artist traits', () => {
  const collections = new Map();
  for (const entry of review.entries) {
    assert.ok(entry.artists.length >= 1);
    assert.equal(new Set(entry.artists).size, entry.artists.length);
    for (const {collection, asset} of entry.assets) {
      if (!collections.has(collection)) collections.set(collection, normalizeAssets(read(`collections/${collection}/assets.json`).assets));
      const record = collections.get(collection).find(row => row.asset === asset);
      assert.ok(record, `${collection}/${asset}`);
      assert.deepEqual(record.attributes.filter(t => t.trait_type === 'Artist').map(t => t.value), entry.artists, `${collection}/${asset}`);
    }
  }
});

test('ambiguous and confirmed individual names are not split by punctuation', () => {
  for (const entry of [...review.held, ...review.preserved]) for (const {collection, asset} of entry.assets) {
    const record = read(`collections/${collection}/assets.json`).assets.find(row=>row.asset===asset);
    assert.ok(record.attributes.some(t=>t.trait_type==='Artist' && t.value===entry.credit));
  }
});

function fixture(t, entries) {
  const directory = mkdtempSync(join(tmpdir(), 'artist-splits-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  mkdirSync(join(directory, 'data'));
  mkdirSync(join(directory, 'collections', 'example'), { recursive: true });
  writeFileSync(join(directory, 'data', 'collaboration-credits.json'), JSON.stringify({ entries }));
  writeFileSync(join(directory, 'collections', 'example', 'meta.json'), JSON.stringify({
    name: 'Example', kind: 'canonical', description: 'Example collection.', art_frame: 'card',
  }));
  return directory;
}

test('source refreshes and switching to an endpoint cannot restore reviewed combined credits', async t => {
  const directory = fixture(t, [{ credit: 'Alice x Bob', artists: ['Alice', 'Bob'] }]);
  const assets = [{ asset: 'TESTART', attributes: [
    { trait_type: 'Artist', value: 'ALICE X BOB' },
    { trait_type: 'Artist', value: 'Bob' },
    { trait_type: 'Title', value: 'Alice x Bob' },
    { trait_type: 'Artist', value: 'Vibes and Stuff' },
  ] }];
  const staticPath = join(directory, 'collections', 'example', 'assets.json');
  writeFileSync(staticPath, JSON.stringify({ assets }));
  const first = await materializeRepository({ repositoryRoot: directory });
  assert.deepEqual(first.collections[0].assets[0].attributes, [
    { trait_type: 'Artist', value: 'Alice' }, { trait_type: 'Artist', value: 'Bob' },
    { trait_type: 'Title', value: 'Alice x Bob' }, { trait_type: 'Artist', value: 'Vibes and Stuff' },
  ]);
  rmSync(staticPath);
  writeFileSync(join(directory, 'collections', 'example', 'adapter.ts'),
    'export async function load({ fetchJson }) { return await fetchJson("https://example.com/feed"); }');
  const refreshed = await materializeRepository({ repositoryRoot: directory, fetchJson: async () => assets });
  assert.deepEqual(refreshed.collections, first.collections);
  const splits = readArtistCreditSplits(directory);
  assert.deepEqual(applyArtistCreditSplits(first.collections[0].assets, splits), first.collections[0].assets);
});

test('invalid correction rules fail closed before loading endpoints', async t => {
  for (const entries of [
    [{ credit: 'Alice x Bob', artists: ['Alice', 'alice'] }],
    [{ credit: 'Alice x Bob', artists: ['Alice', 'Alice x Bob'] }],
    [{ credit: 'Alice x Bob', artists: ['Alice', 'Bob'] }, { credit: 'alice x bob', artists: ['Alice', 'Carol'] }],
    [{ credit: 'Alice x Bob', artists: [] }],
  ]) {
    const directory = fixture(t, entries);
    await assert.rejects(materializeRepository({ repositoryRoot: directory, fetchJson: async () => {
      assert.fail('invalid rules must stop before network calls');
    } }), /duplicate|split targets|at least one/);
  }
});

test('single-artist reattributions survive endpoint refreshes and reuse the canonical credit', async t => {
  const credit = 'V2 ROBNESS, (THE ROBNESS), Ground Beef Taxi.';
  const directory = fixture(t, [{ credit, artists: ['Robness'] }]);
  writeFileSync(join(directory, 'collections', 'example', 'adapter.ts'),
    'export async function load({ fetchJson }) { return await fetchJson("https://example.com/feed"); }');
  const result = await materializeRepository({ repositoryRoot: directory, fetchJson: async () => [
    { asset: 'NORMIES', attributes: [{ trait_type: 'Artist', value: credit }, { trait_type: 'Artist', value: 'Robness' }] },
  ] });
  assert.deepEqual(result.collections[0].assets[0].attributes, [{ trait_type: 'Artist', value: 'Robness' }]);
});
