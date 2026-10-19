#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectionSlugs, resolveCollectionSource, materializeRepository } from '#lib/collection-source';
import { createFetchJson, createFetchText } from '#lib/safe-fetch';

// Observe the real exporter, including pagination and retries, without changing
// adapter transport limits or caching semantics. Bytes are decoded body bytes.
export function measuredFetch(fetchImpl = globalThis.fetch, requests = []) {
  return async (input, options) => {
    const start = performance.now();
    const entry = { url: String(input), bytes: 0 };
    requests.push(entry);
    try {
      const response = await fetchImpl(input, options);
      entry.status = response.status;
      entry.headersMs = Math.round(performance.now() - start);
      for (const name of ['etag', 'last-modified', 'cache-control', 'retry-after']) {
        const value = response.headers.get(name);
        if (value !== null) (entry.headers ??= {})[name] = value;
      }
      if (!response.body) return response;
      const reader = response.body.getReader();
      const body = new ReadableStream({
        async pull(controller) {
          try {
            const { done, value } = await reader.read();
            if (done) {
              entry.durationMs = Math.round(performance.now() - start);
              controller.close();
            } else {
              entry.bytes += value.byteLength;
              controller.enqueue(value);
            }
          } catch (error) { entry.error = error.message; controller.error(error); }
        },
        cancel(reason) { entry.cancelled = true; return reader.cancel(reason); },
      });
      return new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers });
    } catch (error) {
      entry.durationMs = Math.round(performance.now() - start);
      entry.error = error.message;
      throw error;
    }
  };
}

export function membershipChanges(before, after) {
  if (!Array.isArray(before?.collections)) throw new Error('Invalid published manifest');
  const previous = new Map(before.collections.map(c => [c.slug, c]));
  const changes = [];
  for (const collection of after.collections) {
    const old = new Map((previous.get(collection.slug)?.assets ?? []).map(a => [a.asset, a]));
    const current = new Map((collection.assets ?? []).map(a => [a.asset, a]));
    const added = [...current.keys()].filter(a => !old.has(a));
    const removed = [...old.keys()].filter(a => !current.has(a));
    const updated = [...current.keys()].filter(a => old.has(a) && !isDeepStrictEqual(old.get(a), current.get(a)))
      .map(asset => ({ asset, before: old.get(asset), after: current.get(asset) }));
    if (added.length || removed.length || updated.length) changes.push({ slug: collection.slug, added, removed, updated });
    previous.delete(collection.slug);
  }
  for (const c of previous.values()) changes.push({ slug: c.slug, added: [], removed: (c.assets ?? []).map(a => a.asset), updated: [] });
  return changes;
}

export async function measureSources(repositoryRoot = process.cwd(), baselinePath) {
  const requests = [];
  const inventory = {};
  for (const slug of collectionSlugs(repositoryRoot)) {
    const { type } = resolveCollectionSource(repositoryRoot, slug);
    (inventory[type] ??= []).push(slug);
  }
  const report = { measuredAt: new Date().toISOString(), inventory, requests };
  const start = performance.now();
  const fetchImpl = measuredFetch(globalThis.fetch, requests);
  const directory = resolve(repositoryRoot, 'dist');
  mkdirSync(directory, { recursive: true });
  try {
    const { schema_version, collections } = await materializeRepository({
      repositoryRoot,
      fetchJson: createFetchJson({ fetchImpl }),
      fetchText: createFetchText({ fetchImpl }),
    });
    report.memberships = Object.fromEntries(collections.map(c => [c.slug, c.assets?.length ?? 0]));
    if (baselinePath) report.changes = membershipChanges(JSON.parse(readFileSync(baselinePath, 'utf8')), { collections });
    writeFileSync(resolve(directory, 'collections.json'), JSON.stringify({ schema_version, collections }, null, 2) + '\n');
    report.success = true;
  } catch (error) {
    report.success = false;
    report.error = error.message;
    throw error;
  } finally {
    report.durationMs = Math.round(performance.now() - start);
    writeFileSync(resolve(directory, 'source-measurement.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ success: report.success, durationMs: report.durationMs, requests: requests.length, bytes: requests.reduce((n, r) => n + r.bytes, 0) }));
    if (process.env.GITHUB_STEP_SUMMARY) {
      const lines = ['## Source refresh', '', `Success: ${report.success}. ${requests.length} requests; ${requests.reduce((n, r) => n + r.bytes, 0)} decoded bytes; ${report.durationMs} ms.`, '',
        '| Collection | Added | Removed | Updated |', '| --- | ---: | ---: | ---: |',
        ...(report.changes ?? []).map(c => `| ${c.slug} | ${c.added.length} | ${c.removed.length} | ${c.updated.length} |`), '',
        'The source-measurement artifact contains request timings, validators, asset names, and before/after metadata. Failed exports are not published.', ''];
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n'));
    }
  }
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length > 4 || (process.argv[2] && (process.argv[2] !== '--baseline' || !process.argv[3]))) throw new Error('Usage: node scripts/measure-sources.ts [--baseline manifest.json]');
    await measureSources(process.cwd(), process.argv[3]);
  }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
