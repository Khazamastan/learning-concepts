/**
 * Title: LRU Cache
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Design an LRU cache with `get` and `put` operations that run in O(1) time.
 *
 * Solution Explanation:
 * JavaScript's `Map` preserves insertion order, letting us treat it like a doubly linked list to move recently used keys to the end.
 *
 * Approach Outline:
 * On `get`, reinsert the key to move it to the end. On `put`, delete an existing key, or evict the least recently used (the first key) when over capacity before inserting.
 *
 * Complexity:
 *   Time: O(1) get/put
 *   Space: O(capacity)
 *
 * Tests:
 *   - const cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); assert.strictEqual(cache.get(1), 1); cache.put(3, 3); assert.strictEqual(cache.get(2), -1); cache.put(4, 4); assert.strictEqual(cache.get(1), -1); assert.strictEqual(cache.get(3), 3); assert.strictEqual(cache.get(4), 4);
 */

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}

module.exports = { LRUCache };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); assert.strictEqual(cache.get(1), 1); cache.put(3, 3); assert.strictEqual(cache.get(2), -1); cache.put(4, 4); assert.strictEqual(cache.get(1), -1); assert.strictEqual(cache.get(3), 3); assert.strictEqual(cache.get(4), 4);
  console.log('All tests passed for LRU Cache.');
}
