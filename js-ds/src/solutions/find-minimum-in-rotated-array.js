/**
 * Title: Find Minimum in Rotated Array
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta
 *
 * Problem Summary:
 * Given a rotated sorted array with no duplicates, find the minimum element.
 *
 * Solution Explanation:
 * Binary search compares the middle element with the right boundary to decide which half contains the minimum.
 *
 * Approach Outline:
 * While left < right, move toward the unsorted half: if `nums[mid] > nums[right]`, search right half; otherwise search left half including mid.
 *
 * Complexity:
 *   Time: O(log n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(findMin([3,4,5,1,2]), 1);
 *   - assert.strictEqual(findMin([4,5,6,7,0,1,2]), 0);
 */

function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}

module.exports = { findMin };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(findMin([3,4,5,1,2]), 1);
  assert.strictEqual(findMin([4,5,6,7,0,1,2]), 0);
  console.log('All tests passed for Find Minimum in Rotated Array.');
}
