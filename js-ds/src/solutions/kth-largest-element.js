/**
 * Title: Kth Largest Element (Quickselect)
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given an integer array `nums` and integer `k`, return the kth largest element in the array.
 *
 * Solution Explanation:
 * Quickselect partitions around a pivot and only recurses into the side containing the target index.
 *
 * Approach Outline:
 * Target the `(n - k)`th index in zero-based order. Partition around a pivot and recurse into the relevant half until the pivot lands at the target index.
 *
 * Complexity:
 *   Time: O(n) average
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(findKthLargest([3,2,1,5,6,4], 2), 5);
 *   - assert.strictEqual(findKthLargest([3,2,3,1,2,4,5,5,6], 4), 4);
 */

function findKthLargest(nums, k) {
  const target = nums.length - k;
  const quickselect = (left, right) => {
    const pivot = nums[right];
    let store = left;
    for (let i = left; i < right; i += 1) {
      if (nums[i] <= pivot) {
        [nums[store], nums[i]] = [nums[i], nums[store]];
        store += 1;
      }
    }
    [nums[store], nums[right]] = [nums[right], nums[store]];
    if (store === target) return nums[store];
    if (store < target) return quickselect(store + 1, right);
    return quickselect(left, store - 1);
  };
  return quickselect(0, nums.length - 1);
}

module.exports = { findKthLargest };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(findKthLargest([3,2,1,5,6,4], 2), 5);
  assert.strictEqual(findKthLargest([3,2,3,1,2,4,5,5,6], 4), 4);
  console.log('All tests passed for Kth Largest Element (Quickselect).');
}
