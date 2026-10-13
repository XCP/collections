import { normalizeFeedV1 } from '#lib/collection-source';

const URL = 'https://www.thecounterp.art/api/feed/v1';

export async function load({ fetchJson }) {
  const feed = await fetchJson(URL, { timeoutMs: 20_000, maxBytes: 2_000_000, maxRedirects: 2 });
  return normalizeFeedV1(feed, 'the-counterpart');
}
