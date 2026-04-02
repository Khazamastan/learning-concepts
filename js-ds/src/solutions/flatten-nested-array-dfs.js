/**
 * Title: Flatten Nested Array (DFS)
 * Difficulty: Easy
 * Companies: Flipkart, Google, Meta
 *
 * Problem Summary:
 * Deeply flatten a nested array of any depth without using `Array.flat()`.
 *
 * Solution Explanation:
 * A recursive depth-first traversal visits nested arrays and collects primitive values in order.
 *
 * Approach Outline:
 * Traverse each element; recurse into arrays and push non-array items into the result. A generator version yields lazily.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(d)
 *
 * Tests:
 *   - assert.deepStrictEqual(flattenDFS([1, [2, [3, [4]]]]), [1, 2, 3, 4]);
 *   - assert.deepStrictEqual([...flatGenerator([1, [2, [3]]])], [1, 2, 3]);
 */

function flattenDFS(arr) {
  const result = [];
  const traverse = (items) => {
    for (const item of items) {
      if (Array.isArray(item)) traverse(item);
      else result.push(item);
    }
  };
  traverse(arr);
  return result;
}

function* flatGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) yield* flatGenerator(item);
    else yield item;
  }
}

module.exports = { flattenDFS, flatGenerator };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(flattenDFS([1, [2, [3, [4]]]]), [1, 2, 3, 4]);
  assert.deepStrictEqual([...flatGenerator([1, [2, [3]]])], [1, 2, 3]);
  console.log('All tests passed for Flatten Nested Array (DFS).');
}
