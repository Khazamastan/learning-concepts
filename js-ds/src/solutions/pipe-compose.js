/**
 * Title: Implement pipe / compose
 * Difficulty: Easy
 * Companies: Meta, Google, Atlassian
 *
 * Problem Summary:
 * Implement functional helpers `pipe(...fns)` (left-to-right) and `compose(...fns)` (right-to-left).
 *
 * Solution Explanation:
 * Both helpers reduce a list of functions into a single function that passes the value through each function in order.
 *
 * Approach Outline:
 * `pipe` reduces functions left-to-right while `compose` reduces right-to-left using Array reduction.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(1)
 *
 * Tests:
 *   - const double = (x) => x * 2;
 *   - const increment = (x) => x + 1;
 *   - const square = (x) => x * x;
 *   - assert.strictEqual(pipe(double, increment, square)(2), 36);
 *   - assert.strictEqual(compose(square, increment, double)(2), 36);
 */

function pipe(...fns) {
  return (input) => fns.reduce((value, fn) => fn(value), input);
}

function compose(...fns) {
  return (input) => fns.reduceRight((value, fn) => fn(value), input);
}

module.exports = { pipe, compose };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const double = (x) => x * 2;
  const increment = (x) => x + 1;
  const square = (x) => x * x;
  assert.strictEqual(pipe(double, increment, square)(2), 36);
  assert.strictEqual(compose(square, increment, double)(2), 36);
  console.log('All tests passed for Implement pipe / compose.');
}
