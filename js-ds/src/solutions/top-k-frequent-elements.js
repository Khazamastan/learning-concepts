/**
 * Title: Top K Frequent Elements
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in any order.
 *
 * Solution Explanation:
 * Bucket sorting by frequency lets us collect the most frequent elements without a heap.
 *
 * Approach Outline:
 * Build a frequency map, scatter numbers into buckets indexed by frequency, then iterate the buckets from highest to lowest adding elements until `k` elements are collected.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.deepStrictEqual(new Set(topKFrequent([1,1,1,2,2,3], 2)), new Set([1,2]));
 *   - assert.deepStrictEqual(topKFrequent([1], 1), [1]);
 */

function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq.entries()) {
    buckets[count].push(num);
  }
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i -= 1) {
    if (buckets[i].length) result.push(...buckets[i]);
  }
  return result.slice(0, k);
}

module.exports = { topKFrequent };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(new Set(topKFrequent([1,1,1,2,2,3], 2)), new Set([1,2]));
  assert.deepStrictEqual(topKFrequent([1], 1), [1]);
  console.log('All tests passed for Top K Frequent Elements.');
}
