/**
 * Title: House Robber
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given an array of non-negative integers representing house values, return the maximum amount you can rob without robbing adjacent houses.
 *
 * Solution Explanation:
 * Dynamic programming chooses between robbing the current house plus `prev2` or skipping to keep `prev1`.
 *
 * Approach Outline:
 * Maintain two rolling values: `prev1` (max up to previous house) and `prev2` (max up to house before that). Update them for each house.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(rob([1,2,3,1]), 4);
 *   - assert.strictEqual(rob([2,7,9,3,1]), 12);
 */

function rob(nums) {
  let prev1 = 0;
  let prev2 = 0;
  for (const value of nums) {
    const best = Math.max(prev1, prev2 + value);
    prev2 = prev1;
    prev1 = best;
  }
  return prev1;
}

module.exports = { rob };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(rob([1,2,3,1]), 4);
  assert.strictEqual(rob([2,7,9,3,1]), 12);
  console.log('All tests passed for House Robber.');
}
