# TokenScan aggregator

`adapter.ts` translates TokenScan's public project endpoint into normalized
Counterparty asset identifiers. It prefers the asset longname supplied by the
provider, validates complete response counts and tuple shapes, and uses bounded
requests with throttling and retry handling.

TokenScan is an aggregator, not collection authority. Its output is useful for
discovery, comparison, and seeding an explicit `assets.json` snapshot.
