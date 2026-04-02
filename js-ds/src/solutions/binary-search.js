/**
 * Title: Binary Search
 * Difficulty: Easy
 * Companies: Google, Amazon, Meta, Microsoft
 *
 * Problem Summary:
 * Given a sorted array `nums` and a `target`, return the index of `target` or `-1` if not found.
 *
 * Solution Explanation:
 * Binary search repeatedly halves the search interval by comparing the middle element to the target.
 *
 * Approach Outline:
 * Track left and right pointers. While `left <= right`, compute mid, compare, and move the appropriate pointer.
 *
 * Complexity:
 *   Time: O(log n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(binarySearch([-1,0,3,5,9,12], 9), 4);
 *   - assert.strictEqual(binarySearch([-1,0,3,5,9,12], 2), -1);
 */

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

module.exports = { binarySearch };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(binarySearch([-1,0,3,5,9,12], 9), 4);
  assert.strictEqual(binarySearch([-1,0,3,5,9,12], 2), -1);
  console.log('All tests passed for Binary Search.');
}
