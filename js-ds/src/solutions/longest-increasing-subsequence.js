/**
 * Title: Longest Increasing Subsequence
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta
 *
 * Problem Summary:
 * Given an integer array `nums`, return the length of the longest strictly increasing subsequence.
 *
 * Solution Explanation:
 * The patience sorting technique maintains minimal possible tails for increasing subsequences of each length.
 *
 * Approach Outline:
 * Iterate through the numbers using binary search to place each number into the smallest tail greater than or equal to it; the tails array length is the LIS.
 *
 * Complexity:
 *   Time: O(n log n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.strictEqual(lengthOfLIS([10,9,2,5,3,7,101,18]), 4);
 *   - assert.strictEqual(lengthOfLIS([0,1,0,3,2,3]), 4);
 */

function lengthOfLIS(nums) {
  const tails = [];
  for (const num of nums) {
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    tails[left] = num;
  }
  return tails.length;
}

module.exports = { lengthOfLIS };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(lengthOfLIS([10,9,2,5,3,7,101,18]), 4);
  assert.strictEqual(lengthOfLIS([0,1,0,3,2,3]), 4);
  console.log('All tests passed for Longest Increasing Subsequence.');
}
