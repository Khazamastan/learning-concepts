/**
 * Title: Climbing Stairs
 * Difficulty: Easy
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * You can climb either 1 or 2 steps at a time. Given `n`, return how many distinct ways there are to reach the top.
 *
 * Solution Explanation:
 * The recurrence matches Fibonacci numbers because the last move can be 1 or 2 steps.
 *
 * Approach Outline:
 * Iteratively track the last two values of the sequence (ways to reach the previous two steps) and update until reaching `n`.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - assert.strictEqual(climbStairs(2), 2);
 *   - assert.strictEqual(climbStairs(3), 3);
 *   - assert.strictEqual(climbStairs(5), 8);
 */

function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i += 1) {
    const next = first + second;
    first = second;
    second = next;
  }
  return second;
}

module.exports = { climbStairs };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(climbStairs(2), 2);
  assert.strictEqual(climbStairs(3), 3);
  assert.strictEqual(climbStairs(5), 8);
  console.log('All tests passed for Climbing Stairs.');
}
