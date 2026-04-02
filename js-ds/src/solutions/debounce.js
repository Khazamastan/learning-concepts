/**
 * Title: Debounce
 * Difficulty: Medium
 * Companies: Google, Meta, Amazon, Atlassian, Flipkart
 *
 * Problem Summary:
 * Implement `debounce(fn, delay)` which delays invoking `fn` until after `delay` milliseconds have elapsed since the last call.
 *
 * Solution Explanation:
 * The debounced function clears and resets a timer on every call. Only when the timer expires is the original function invoked.
 *
 * Approach Outline:
 * Return a closure holding the timer identifier. On each call, cancel the previous timeout and schedule a new one that calls `fn` with the latest context and arguments.
 *
 * Complexity:
 *   Time: O(1)
 *   Space: O(1)
 *
 * Tests:
 *   - let count = 0;
 *   - const debounced = debounce(() => { count += 1; }, 30);
 *   - debounced(); debounced(); debounced();
 *   - await wait(50);
 *   - assert.strictEqual(count, 1);
 */

function debounce(fn, delay) {
  let timer = null;
  return function debounced(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}

module.exports = { debounce };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  (async () => {
    let count = 0;
    const debounced = debounce(() => { count += 1; }, 30);
    debounced(); debounced(); debounced();
    await wait(50);
    assert.strictEqual(count, 1);
    console.log('All tests passed for Debounce.');
  })().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
