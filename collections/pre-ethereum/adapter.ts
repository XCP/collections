// A computed curated view. The marketplace evaluates this normalized rule
// against its locally indexed asset facts; this adapter performs no network I/O.
export async function load() {
  return {
    "where": {
      "issued_before_block": 367561
    }
  };
}
