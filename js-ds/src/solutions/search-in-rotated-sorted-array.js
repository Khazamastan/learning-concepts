/**
 * Title: Search in Rotated Sorted Array
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given a rotated sorted array and a `target`, return its index or `-1`. The algorithm must run in O(log n).
 *
 * Solution Explanation:
 * In a rotated array at least one half is still sorted; detect which half and search within it.
 *
 * Approach Outline:
 * Compare `nums[left]`, `nums[mid]`, and `nums[right]` to determine the sorted half and adjust pointers based on the target location.
 *
 * Complexity:
 *   Time: O(log n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(searchRotated([4,5,6,7,0,1,2], 0), 4);
 *   - assert.strictEqual(searchRotated([4,5,6,7,0,1,2], 3), -1);
 */

function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}

module.exports = { searchRotated };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(searchRotated([4,5,6,7,0,1,2], 0), 4);
  assert.strictEqual(searchRotated([4,5,6,7,0,1,2], 3), -1);
  console.log('All tests passed for Search in Rotated Sorted Array.');
}
