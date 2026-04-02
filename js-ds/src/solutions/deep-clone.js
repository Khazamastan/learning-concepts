/**
 * Title: Deep Clone
 * Difficulty: Medium
 * Companies: Google, Meta, Atlassian, Flipkart
 *
 * Problem Summary:
 * Implement `deepClone(value)` that creates a deep copy handling objects, arrays, Maps, Sets, Dates, and circular references.
 *
 * Solution Explanation:
 * Recursively copy complex structures while tracking visited objects in a WeakMap to support circular references.
 *
 * Approach Outline:
 * Check primitives first, then handle built-ins like Date, Map, and Set. For plain objects/arrays, iterate own keys recursively while caching clones.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - const original = { a: 1, b: { c: 2 }, d: new Date(0), e: new Map([[1, { x: 3 }]]), f: new Set([1,2]) }; original.self = original;
 *   - const cloned = deepClone(original);
 *   - assert.deepStrictEqual(cloned.b, { c: 2 });
 *   - assert.deepStrictEqual(cloned.e.get(1), { x: 3 });
 *   - assert.notStrictEqual(cloned.b, original.b);
 *   - assert.strictEqual(cloned.self, cloned);
 */

function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Date) return new Date(value);
  if (value instanceof Map) {
    const clone = new Map();
    seen.set(value, clone);
    for (const [k, v] of value.entries()) {
      clone.set(deepClone(k, seen), deepClone(v, seen));
    }
    return clone;
  }
  if (value instanceof Set) {
    const clone = new Set();
    seen.set(value, clone);
    for (const item of value.values()) {
      clone.add(deepClone(item, seen));
    }
    return clone;
  }
  const clone = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, clone);
  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], seen);
  }
  return clone;
}

module.exports = { deepClone };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const original = { a: 1, b: { c: 2 }, d: new Date(0), e: new Map([[1, { x: 3 }]]), f: new Set([1,2]) }; original.self = original;
  const cloned = deepClone(original);
  assert.deepStrictEqual(cloned.b, { c: 2 });
  assert.deepStrictEqual(cloned.e.get(1), { x: 3 });
  assert.notStrictEqual(cloned.b, original.b);
  assert.strictEqual(cloned.self, cloned);
  console.log('All tests passed for Deep Clone.');
}
