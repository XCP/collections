import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { load } from '../../collections/the-counterpart/adapter.ts';
const read = name => JSON.parse(readFileSync(new URL(`../fixtures/collections/the-counterpart/${name}`, import.meta.url), 'utf8'));
const fixture = read('feed.json');

test('CounterpART feed preserves prior memberships and adds the seven catalogue entries', async () => {
  const result = await load({ fetchJson: async (url, options) => {
    assert.equal(url, 'https://www.thecounterp.art/api/feed/v1');
    assert.equal(options.maxBytes, 2_000_000);
    return structuredClone(fixture);
  }});
  const previous = read('previous-assets.json').assets;
  for (const entry of previous) assert.deepEqual(result.assets.find(a => a.asset === entry.asset), entry);
  const old = new Set(previous.map(a => a.asset));
  assert.deepEqual(result.assets.filter(a => !old.has(a.asset)).map(a => a.asset).sort(), ['MEMS','MGMGRAND','NAKA','POKEMON.1','POKEMON.2','POKEMON.3','POKEMON.4']);
});

test('CounterpART rejects invalid feeds and propagates unavailable sources', async () => {
  for (const feed of [{...fixture, collection:'other'}, {...fixture, schema_version:2}, {...fixture, assets:[]}, {...fixture, assets:[fixture.assets[0],fixture.assets[0]]}]) {
    await assert.rejects(load({fetchJson:async()=>feed}));
  }
  await assert.rejects(load({fetchJson:async()=>{throw Error('source unavailable')}}), /source unavailable/);
});

