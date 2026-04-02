/**
 * Title: Curry
 * Difficulty: Medium
 * Companies: Google, Meta, Atlassian, Flipkart
 *
 * Problem Summary:
 * Implement `curry(fn)` that transforms a function into a chain of unary functions supporting partial application.
 *
 * Solution Explanation:
 * The curried function accumulates arguments until enough are provided to invoke the original function.
 *
 * Approach Outline:
 * Return a function that collects arguments; if the total arguments length meets the original function length, call it, otherwise return another function to collect more arguments.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - const add3 = curry((a, b, c) => a + b + c);
 *   - assert.strictEqual(add3(1)(2)(3), 6);
 *   - assert.strictEqual(add3(1, 2)(3), 6);
 */

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}

module.exports = { curry };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const add3 = curry((a, b, c) => a + b + c);
  assert.strictEqual(add3(1)(2)(3), 6);
  assert.strictEqual(add3(1, 2)(3), 6);
  console.log('All tests passed for Curry.');
}
