/**
 * Title: Merge Intervals
 * Difficulty: Medium
 * Companies: Google, Meta, Amazon, Atlassian
 *
 * Problem Summary:
 * Given an array of intervals `intervals[i] = [start, end]`, merge all overlapping intervals.
 *
 * Solution Explanation:
 * Once sorted by start time, only the last merged interval can overlap with the next interval.
 *
 * Approach Outline:
 * Sort intervals, seed the result with the first interval, and extend or append intervals while iterating.
 *
 * Complexity:
 *   Time: O(n log n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.deepStrictEqual(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]), [[1,6],[8,10],[15,18]]);
 *   - assert.deepStrictEqual(mergeIntervals([[1,4],[4,5]]), [[1,5]]);
 */

function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals.map((interval) => interval.slice());
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i += 1) {
    const last = merged[merged.length - 1];
    const [start, end] = intervals[i];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

module.exports = { mergeIntervals };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]), [[1,6],[8,10],[15,18]]);
  assert.deepStrictEqual(mergeIntervals([[1,4],[4,5]]), [[1,5]]);
  console.log('All tests passed for Merge Intervals.');
}
