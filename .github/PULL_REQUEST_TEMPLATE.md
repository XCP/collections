## What changed?

<!-- Name the collection and what you added, removed, or corrected. -->

## Where it comes from

<!-- Link the project's own list, site, or announcement for the assets, and
the source of any artist credits. Reviewers check the change against it. -->

## Membership impact

<!-- Assets added, removed, or marked "primary": false, and any removed from
the Counterparty fallback. Write "none" for a metadata-only change. -->

## Checks

- [ ] I changed one collection (plus its removals from `collections/counterparty/`).
- [ ] I used Counterparty asset names, subasset longnames, or numeric ids.
- [ ] I ran `npm run docs` and `npm run check`.
- [ ] I did not put assets, adapter names, provider URLs, or source configuration
      in `meta.json`.

### Adapters only

- [ ] Public endpoint and why `assets.json` is not enough:
- [ ] I added representative committed fixtures.
- [ ] I used no secrets, new dependencies, filesystem writes, or subprocesses.
- [ ] I ran `node scripts/export.ts` as a live smoke test.
