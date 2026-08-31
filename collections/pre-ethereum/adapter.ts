// A computed curated view. The marketplace applies this normalized rule only
// to assets already admitted to a primary collection, then reads their local
// chain facts. This adapter performs no network I/O.
export async function load() {
  return {
    "where": {
      "issued_before_block": 367561
    }
  };
}
