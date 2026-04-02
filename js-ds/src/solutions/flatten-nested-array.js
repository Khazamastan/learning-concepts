/**
 * Title: Flatten Nested Array
 * Difficulty: Easy
 * Companies: Flipkart, Google, Meta
 *
 * Problem Summary:
 * Implement `flatten(arr, depth)` that flattens a nested array to the given depth (`Infinity` means fully flatten).
 *
 * Solution Explanation:
 * Recursive traversal reduces depth each time an array is encountered and concatenates results.
 *
 * Approach Outline:
 * When the depth is greater than zero and the current item is an array, recurse with `depth - 1`; otherwise, push the item to the result.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(d)
 *
 * Tests:
 *   - assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], 1), [1, 2, [3, [4]]]);
 *   - assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);
 *   - assert.deepStrictEqual([...flatGenerator([1, [2, [3]]])], [1, 2, 3]);
 */

function flatten(arr, depth = Infinity) {
  const result = [];
  const helper = (items, currentDepth) => {
    for (const item of items) {
      if (Array.isArray(item) && currentDepth > 0) {
        helper(item, currentDepth - 1);
      } else {
        result.push(item);
      }
    }
  };
  helper(arr, depth);
  return result;
}

function* flatGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) yield* flatGenerator(item);
    else yield item;
  }
}

module.exports = { flatten, flatGenerator };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], 1), [1, 2, [3, [4]]]);
  assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);
  assert.deepStrictEqual([...flatGenerator([1, [2, [3]]])], [1, 2, 3]);
  console.log('All tests passed for Flatten Nested Array.');
}
