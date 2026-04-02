/**
 * Title: Maximum Subarray (Kadane's)
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given an integer array `nums`, find the contiguous subarray with the largest sum and return that sum.
 *
 * Solution Explanation:
 * The maximum subarray ending at each position either extends the previous subarray or restarts at the current value.
 *
 * Approach Outline:
 * Track `curr` as the best subarray ending at the current index and `best` as the global maximum, updating them as you scan through the array.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6);
 *   - assert.strictEqual(maxSubArray([1]), 1);
 *   - assert.strictEqual(maxSubArray([5,4,-1,7,8]), 23);
 */

function maxSubArray(nums) {
  let curr = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }
  return best;
}

module.exports = { maxSubArray };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6);
  assert.strictEqual(maxSubArray([1]), 1);
  assert.strictEqual(maxSubArray([5,4,-1,7,8]), 23);
  console.log('All tests passed for Maximum Subarray (Kadane's).');
}
