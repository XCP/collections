# Orbital

`adapter.ts` reads Orbital's public collection and orb endpoints. It is a
third-party aggregator and therefore only participates when a collection has
neither `assets.json` nor its own `adapter.ts`.

Only Counterparty asset identifiers and scalar editorial attributes are
retained. Supply, prices, sales, holder counts, images, and all other mutable
chain or market data are deliberately ignored.
