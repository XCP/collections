import { test } from 'node:test';
import assert from 'node:assert/strict';
import { measuredFetch, membershipChanges } from '../scripts/measure-sources.ts';
import { createFetchJson } from '../lib/safe-fetch.ts';

test('diff records additions, removals and changed metadata without object-key noise', () => {
  const before = { collections: [{ slug: 'cards', assets: [{ asset: 'OLD' }, { asset: 'SAME', primary: false }, { asset: 'EDIT', primary: true }] }] };
  const after = { collections: [{ slug: 'cards', assets: [{ primary: false, asset: 'SAME' }, { asset: 'EDIT', primary: false }, { asset: 'NEW' }] }] };
  const [change] = membershipChanges(before, after);
  assert.deepEqual(change.added, ['NEW']);
  assert.deepEqual(change.removed, ['OLD']);
  assert.equal(change.updated[0].asset, 'EDIT');
  assert.equal(change.updated.length, 1);
  assert.deepEqual(membershipChanges(before, { collections: [] })[0].removed, ['OLD', 'SAME', 'EDIT']);
  assert.throws(() => membershipChanges({}, after), /Invalid published/);
});

test('measurement preserves bounded JSON transport and records response metadata', async () => {
  const rows = [];
  const fetchJson = createFetchJson({ fetchImpl: measuredFetch(async () => new Response('{"ok":true}', {
    headers: { 'content-type': 'application/json', etag: '"one"' },
  }), rows) });
  assert.deepEqual(await fetchJson('https://example.com/feed'), { ok: true });
  assert.equal(rows[0].bytes, 11);
  assert.equal(rows[0].headers.etag, '"one"');
  assert.equal(rows[0].status, 200);
  assert.ok(rows[0].durationMs >= 0);
});

test('measurement does not bypass body limits or hide failed requests', async () => {
  const rows = [];
  const fetchJson = createFetchJson({ fetchImpl: measuredFetch(async () => new Response('123456', {
    headers: { 'content-type': 'application/json' },
  }), rows) });
  await assert.rejects(fetchJson('https://example.com/feed', { maxBytes: 3 }), /limit/);
  const failing = measuredFetch(async () => { throw new Error('offline'); }, rows);
  await assert.rejects(failing('https://example.com/feed'), /offline/);
  assert.equal(rows[1].error, 'offline');
});

test('HTTP errors and retry information remain visible to adapters', async () => {
  const rows = [];
  const fetchJson = createFetchJson({ fetchImpl: measuredFetch(async () => new Response(null, {
    status: 429, headers: { 'retry-after': '2' },
  }), rows) });
  await assert.rejects(fetchJson('https://example.com/feed'), error => error.status === 429 && error.retryAfterMs === 2000);
  assert.equal(rows[0].headers['retry-after'], '2');
});
