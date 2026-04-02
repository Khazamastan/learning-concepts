/**
 * Title: 3Sum
 * Difficulty: Medium
 * Companies: Google, Meta, Amazon, Microsoft
 *
 * Problem Summary:
 * Given an integer array, return all unique triplets `[a, b, c]` such that `a + b + c = 0`.
 *
 * Solution Explanation:
 * Sorting enables a two-pointer sweep per chosen base element while cleanly skipping duplicates.
 *
 * Approach Outline:
 * Sort `nums`. For each index, skip duplicates, then move two pointers inward adjusting based on the current sum and skipping duplicate values after each match.
 *
 * Complexity:
 *   Time: O(n^2)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.deepStrictEqual(threeSum([-1,0,1,2,-1,-4]).sort(), [[-1,-1,2],[-1,0,1]].sort());
 *   - assert.deepStrictEqual(threeSum([0,0,0,0]), [[0,0,0]]);
 *   - assert.deepStrictEqual(threeSum([]), []);
 */

function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < nums.length - 2; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        triplets.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left += 1;
        while (left < right && nums[right] === nums[right - 1]) right -= 1;
        left += 1;
        right -= 1;
      } else if (sum < 0) {
        left += 1;
      } else {
        right -= 1;
      }
    }
  }
  return triplets;
}

module.exports = { threeSum };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(threeSum([-1,0,1,2,-1,-4]).sort(), [[-1,-1,2],[-1,0,1]].sort());
  assert.deepStrictEqual(threeSum([0,0,0,0]), [[0,0,0]]);
  assert.deepStrictEqual(threeSum([]), []);
  console.log('All tests passed for 3Sum.');
}
