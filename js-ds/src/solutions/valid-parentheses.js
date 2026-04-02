/**
 * Title: Valid Parentheses
 * Difficulty: Easy
 * Companies: Google, Amazon, Meta, Microsoft
 *
 * Problem Summary:
 * Given a string containing only brackets `()[]{}`, determine if the string is valid (properly matched and ordered).
 *
 * Solution Explanation:
 * A stack tracks currently open brackets; each closing bracket must match the latest opening bracket.
 *
 * Approach Outline:
 * Iterate through characters pushing opening brackets onto a stack and popping when encountering a closing bracket, verifying matches.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.strictEqual(isValid('()'), true);
 *   - assert.strictEqual(isValid('()[]{}'), true);
 *   - assert.strictEqual(isValid('(]'), false);
 */

function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}

module.exports = { isValid };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(isValid('()'), true);
  assert.strictEqual(isValid('()[]{}'), true);
  assert.strictEqual(isValid('(]'), false);
  console.log('All tests passed for Valid Parentheses.');
}
