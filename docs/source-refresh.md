# Scheduled source refresh

The publish workflow refreshes live sources daily at 07:43 UTC (GitHub may delay
scheduled jobs), on relevant main-branch changes, and on manual dispatch. The
marketplace separately checks the published manifest hourly. Static lists remain
reviewed snapshots: this does not periodically rediscover their upstream catalogs.

## Measurement before choosing the schedule

Two full exports on 2026-10-19 resolved 1,073 collections: 1,069 static lists,
three collection adapters, and one metadata-only collection. No aggregator was
selected by the current source precedence.

| Live provider | Requests per export | Decoded bytes |
| --- | ---: | ---: |
| Honda Civic Garage | 1 | 43,603 |
| Kaleidoscope | 36 | 254,225 |
| The CounterpART | 1 | 19,707 |

Both runs succeeded: 38 requests, 317,535 bytes, approximately 24 and 6 seconds
wall time respectively. These are two observations, not a long-term reliability
estimate. The CounterpART returned an ETag but a subsequent If-None-Match request
returned 200; the other feeds exposed neither ETag nor Last-Modified in these
observations. No cross-run response cache or adaptive scheduler is warranted yet.

Compared with the published manifest, these runs found six CounterpART additions,
two Garage additions, and 153 CounterpART Season changes from Pokemons to Pokemons
S1. No membership removals occurred.

## Inspecting and measuring

Run `node scripts/measure-sources.ts` for a fully validated export with request
measurements. Optionally pass `--baseline path/to/published.json` to record added,
removed, and updated assets, including before/after metadata. The command writes
`dist/collections.json` and `dist/source-measurement.json`; neither is committed.

CI downloads the published baseline with a 25 MB / 60 second bound and retains
the measurement artifact for 30 days. The job summary gives counts by collection;
the artifact gives names, metadata changes, request status, body bytes, timing,
cache headers and failures. Only collections.json is deployed to Pages. A failed
download, adapter, or validation blocks publication, preserving the last good
manifest. Reports do not imply manual review: trusted adapter output continues
through the existing automated validation and publication path.

Review the first week of reports for failures, changes per request, bytes and
latency before increasing frequency. If traffic grows materially, optimize the
provider responsible rather than polling every collection individually. For
paginated catalogs, an unchanged first page is not proof that later pages are
unchanged. Conditional caching requires verified validator behavior and a complete
validated cached response; do not treat a 304 as an empty collection.
