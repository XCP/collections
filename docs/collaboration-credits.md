# Individual credits on shared artworks

An asset can carry several `Artist` traits, in display order. Each value names
one contributor and is intended to resolve to that person's own artist page.
For example, INFILTRVTE credits VSTRVL and Chrome Void separately. Consumers
must retain repeated Artist traits rather than taking only the first.

The reviewed conversion in `data/collaboration-credits.json` expands 87 source
labels on 123 collection memberships across six collections. It retains every
original label and asset/collection pair from registry commit 82389c7. The
source labels explicitly name the participants; this work separates existing
credits rather than inferring authorship from an issuing address. No asset or
collection membership is added or removed.

Case, spacing and punctuation variants reuse existing individual credits
where unambiguous, including Rare Scrilla, DJ QBert, HAMMAD, DOGE-STYLE,
ditacrypto, Viva La Vandal, Kevo-B, and Rocco. The existing 80sKurtRussel and
Robness credits also receive the collaborators named by their familiar
80sKurt/80sKurtRussell and ROBNESS V2 variants. Mr.P and Mr. P use one spelling.
Contributor order follows the source credit.

The reviewed map is also applied to every export after loading static files or
endpoint adapters. A returning source label expands to its reviewed individual
credits, including on newly discovered assets and after changing sources.
Matching ignores case and outer whitespace; contributor order is preserved and
repeated individual credits are deduplicated. Invalid or recursive rules stop
the export before publication. Add future reviewed corrections to `entries` in
`data/collaboration-credits.json`; no adapter-specific fix is needed. A rule
can name one target for a reattribution or multiple targets for a collaboration.
The NORMIES source credit `V2 ROBNESS, (THE ROBNESS), Ground Beef Taxi.`
is corrected to the existing `Robness` credit, as confirmed by the curator.

Unrecognized labels remain unchanged. Do not split every name containing `and`,
`&`, or a comma. The curator confirmed H & Art Block is a single artist and
approved keeping Vibes and Stuff, Britts and Stas, Nay and Ry, and Mr. and Mrs.
Micon unchanged. These decisions are recorded under `preserved`. No entries
remain awaiting clarification. FRIENDS WITH YOU is also unchanged.

Deploy marketplace support for multiple Artist traits before publishing this
conversion. Older consumers may otherwise show only the first contributor.

False artist labels can be recorded under `suppressed`, with a reason and the
reviewed asset references. These labels are removed after every source load;
other traits and actual artist credits are retained. `1BCQVoz` is the issuer's
address prefix for YOGURTPUTIN and MOOSEPUTIN, not an established artist name.
No replacement attribution was supported by the available source metadata.
