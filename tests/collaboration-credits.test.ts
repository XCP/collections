import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { normalizeAssets } from '#lib/collection-source';

const root = new URL('../', import.meta.url);
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const review = read('data/collaboration-credits.json');

test('reviewed collaborations survive normalization as ordered individual Artist traits', () => {
  const collections = new Map();
  for (const entry of review.entries) {
    assert.ok(entry.artists.length >= 2);
    assert.equal(new Set(entry.artists).size, entry.artists.length);
    for (const {collection, asset} of entry.assets) {
      if (!collections.has(collection)) collections.set(collection, normalizeAssets(read(`collections/${collection}/assets.json`).assets));
      const record = collections.get(collection).find(row => row.asset === asset);
      assert.ok(record, `${collection}/${asset}`);
      assert.deepEqual(record.attributes.filter(t => t.trait_type === 'Artist').map(t => t.value), entry.artists, `${collection}/${asset}`);
    }
  }
});

test('ambiguous names are not split by punctuation', () => {
  for (const entry of review.held) for (const {collection, asset} of entry.assets) {
    const record = read(`collections/${collection}/assets.json`).assets.find(row=>row.asset===asset);
    assert.ok(record.attributes.some(t=>t.trait_type==='Artist' && t.value===entry.credit));
  }
});
