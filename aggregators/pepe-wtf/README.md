# pepe.wtf aggregator

`adapter.ts` translates pepe.wtf's collection-filtered asset endpoint into
normalized Counterparty membership and the available Artist, Series, and Card
traits. Chain and market-state fields are intentionally ignored.

pepe.wtf is an aggregator, not collection authority. Its output is useful for
discovery, comparison, and seeding an explicit `assets.json` snapshot.
