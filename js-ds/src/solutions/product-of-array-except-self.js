/**
 * Title: Product of Array Except Self
 * Difficulty: Medium
 * Companies: Amazon, Meta, Google, Microsoft
 *
 * Problem Summary:
 * Given an integer array `nums`, return an array `answer` where `answer[i]` equals the product of all elements except `nums[i]`. Division is not allowed.
 *
 * Solution Explanation:
 * The product at each index equals the prefix product to the left times the suffix product to the right.
 *
 * Approach Outline:
 * First pass records prefixes into the result array; second pass multiplies each entry by a running suffix from the right.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1) extra
 *
 * Tests:
 *   - assert.deepStrictEqual(productExceptSelf([1,2,3,4]), [24,12,8,6]);
 *   - assert.deepStrictEqual(productExceptSelf([-1,1,0,-3,3]), [0,0,9,0,0]);
 */

function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i += 1) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i -= 1) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}

module.exports = { productExceptSelf };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(productExceptSelf([1,2,3,4]), [24,12,8,6]);
  assert.deepStrictEqual(productExceptSelf([-1,1,0,-3,3]), [0,0,9,0,0]);
  console.log('All tests passed for Product of Array Except Self.');
}
