/**
 * Title: Throttle
 * Difficulty: Medium
 * Companies: Google, Meta, Amazon, Flipkart
 *
 * Problem Summary:
 * Implement `throttle(fn, interval)` which ensures `fn` is invoked at most once per `interval` milliseconds.
 *
 * Solution Explanation:
 * Throttle records the time of the last invocation and ignores calls that occur before the cooldown expires.
 *
 * Approach Outline:
 * Store the timestamp of the previous execution. On each call, compare `Date.now()` to the stored time and execute only if the interval has elapsed.
 *
 * Complexity:
 *   Time: O(1)
 *   Space: O(1)
 *
 * Tests:
 *   - let invocations = 0;
 *   - const throttled = throttle(() => { invocations += 1; }, 40);
 *   - throttled();
 *   - throttled();
 *   - await wait(20);
 *   - throttled();
 *   - await wait(40);
 *   - throttled();
 *   - await wait(50);
 *   - assert.strictEqual(invocations, 3);
 */

function throttle(fn, interval) {
  let lastTime = 0;
  return function throttled(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

module.exports = { throttle };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  (async () => {
    let invocations = 0;
    const throttled = throttle(() => { invocations += 1; }, 40);
    throttled();
    throttled();
    await wait(20);
    throttled();
    await wait(40);
    throttled();
    await wait(50);
    assert.strictEqual(invocations, 3);
    console.log('All tests passed for Throttle.');
  })().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
