/**
 * Title: Memoize
 * Difficulty: Medium
 * Companies: Google, Meta, Amazon, Microsoft
 *
 * Problem Summary:
 * Implement `memoize(fn)` that caches function results for identical argument lists.
 *
 * Solution Explanation:
 * Serialize arguments (or use a nested map) to create a cache key and reuse stored results.
 *
 * Approach Outline:
 * Store results in a Map keyed by JSON stringified arguments. On each call, return from cache if present; otherwise compute and store.
 *
 * Complexity:
 *   Time: O(1) cached
 *   Space: O(n)
 *
 * Tests:
 *   - let calls = 0;
 *   - const slowAdd = memoize((a, b) => { calls += 1; return a + b; });
 *   - assert.strictEqual(slowAdd(1, 2), 3);
 *   - assert.strictEqual(slowAdd(1, 2), 3);
 *   - assert.strictEqual(calls, 1);
 */

function memoize(fn) {
  const cache = new Map();
  return function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

module.exports = { memoize };

if (require.main === module) {
  const assert = require('node:assert/strict');
  let calls = 0;
  const slowAdd = memoize((a, b) => { calls += 1; return a + b; });
  assert.strictEqual(slowAdd(1, 2), 3);
  assert.strictEqual(slowAdd(1, 2), 3);
  assert.strictEqual(calls, 1);
  console.log('All tests passed for Memoize.');
}
