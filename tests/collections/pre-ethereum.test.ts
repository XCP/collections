import assert from "node:assert/strict";
import test from "node:test";

import { load } from "#collections/pre-ethereum";

test("declares the historical cutoff without network access", async () => {
  assert.deepEqual(await load(), {
    where: { issued_before_block: 367561 },
  });
});
