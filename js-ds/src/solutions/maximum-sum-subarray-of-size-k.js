/**
 * Title: Maximum Sum Subarray of Size K
 * Difficulty: Easy
 * Companies: Amazon, Google, Atlassian
 *
 * Problem Summary:
 * Given an integer array and an integer `k`, find the maximum sum of any contiguous subarray of size `k`.
 *
 * Solution Explanation:
 * A fixed-size sliding window maintains the sum of the last `k` elements and updates in O(1) as the window slides.
 *
 * Approach Outline:
 * Compute the initial window sum, then slide by adding the incoming element and subtracting the outgoing element, updating the maximum sum.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(maxSumSubarray([2, 1, 5, 1, 3, 2], 3), 9);
 *   - assert.strictEqual(maxSumSubarray([2, 3, 4, 1, 5], 2), 7);
 */

function maxSumSubarray(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i += 1) sum += nums[i];
  let maxSum = sum;
  for (let i = k; i < nums.length; i += 1) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}

module.exports = { maxSumSubarray };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(maxSumSubarray([2, 1, 5, 1, 3, 2], 3), 9);
  assert.strictEqual(maxSumSubarray([2, 3, 4, 1, 5], 2), 7);
  console.log('All tests passed for Maximum Sum Subarray of Size K.');
}
