/**
 * Title: Trapping Rain Water
 * Difficulty: Hard
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given an array of non-negative integers representing the elevation map where the width of each bar is 1,
 * compute how much water can be trapped after raining.
 *
 * Solution Explanation:
 * Use a two-pointer sweep that keeps track of the tallest wall seen so far from both ends. Water trapped at a
 * position depends on the smaller of the best left/right walls minus the current height.
 *
 * Approach Outline:
 *   - Maintain pointers `left` and `right` that converge toward the center, along with running maxima `leftMax`
 *     and `rightMax`.
 *   - Move the pointer referencing the shorter wall inward because the trapped water there is bounded by that
 *     side.
 *   - Accumulate trapped water when the current bar is shorter than the best wall on its side.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(trap([0,1,0,2,1,0,1,3,2,1,2,1]), 6);
 *   - assert.strictEqual(trap([4,2,0,3,2,5]), 9);
 */

function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left += 1;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right -= 1;
    }
  }

  return water;
}

module.exports = { trap };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(trap([0,1,0,2,1,0,1,3,2,1,2,1]), 6);
  assert.strictEqual(trap([4,2,0,3,2,5]), 9);
  assert.strictEqual(trap([1,2,3]), 0);
  console.log('All tests passed for Trapping Rain Water.');
}

