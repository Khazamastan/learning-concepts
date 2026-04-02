/**
 * Title: Min Stack
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta
 *
 * Problem Summary:
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * Solution Explanation:
 * Maintain a parallel stack storing the running minimum at each depth so `getMin` returns in O(1).
 *
 * Approach Outline:
 * Push values onto the main stack and the current minimum onto the min stack; pop from both stacks simultaneously.
 *
 * Complexity:
 *   Time: O(1) per operation
 *   Space: O(n)
 *
 * Tests:
 *   - const stack = new MinStack(); stack.push(-2); stack.push(0); stack.push(-3); assert.strictEqual(stack.getMin(), -3); stack.pop(); assert.strictEqual(stack.top(), 0); assert.strictEqual(stack.getMin(), -2);
 */

class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

module.exports = { MinStack };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const stack = new MinStack(); stack.push(-2); stack.push(0); stack.push(-3); assert.strictEqual(stack.getMin(), -3); stack.pop(); assert.strictEqual(stack.top(), 0); assert.strictEqual(stack.getMin(), -2);
  console.log('All tests passed for Min Stack.');
}
