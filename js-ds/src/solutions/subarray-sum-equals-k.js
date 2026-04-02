/**
 * Title: Subarray Sum Equals K
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta
 *
 * Problem Summary:
 * Given an integer array `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.
 *
 * Solution Explanation:
 * Two prefix sums differ by `k` exactly when the subarray between them sums to `k`; tracking prefix sums with a hash map counts these occurrences.
 *
 * Approach Outline:
 * Maintain a map from prefix sum to frequency. For each new prefix sum, add the frequency of `sum - k` to the answer, then increment the frequency of the current sum.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.strictEqual(subarraySum([1,1,1], 2), 2);
 *   - assert.strictEqual(subarraySum([1,2,3], 3), 2);
 */

function subarraySum(nums, k) {
  const counts = new Map([[0, 1]]);
  let sum = 0;
  let total = 0;
  for (const num of nums) {
    sum += num;
    total += counts.get(sum - k) || 0;
    counts.set(sum, (counts.get(sum) || 0) + 1);
  }
  return total;
}

module.exports = { subarraySum };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(subarraySum([1,1,1], 2), 2);
  assert.strictEqual(subarraySum([1,2,3], 3), 2);
  console.log('All tests passed for Subarray Sum Equals K.');
}
