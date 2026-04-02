/**
 * Title: Two Sum
 * Difficulty: Easy
 * Companies: Google, Amazon, Meta, Microsoft
 *
 * Problem Summary:
 * Given an array of integers `nums` and a target, return the indices of the two numbers such that they add up to `target`. Exactly one solution exists and each element may be used at most once.
 *
 * Solution Explanation:
 * Store visited values in a hash map so the complement `target - nums[i]` can be located in constant time.
 *
 * Approach Outline:
 * Iterate the array once. For each value compute the complement; if it exists in the map return both indices, otherwise record the current value and continue.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
 *   - assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);
 *   - assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]);
 */

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}

module.exports = { twoSum };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);
  assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]);
  console.log('All tests passed for Two Sum.');
}
