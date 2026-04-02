/**
 * Title: Promise.all Polyfill
 * Difficulty: Medium
 * Companies: Google, Meta, Amazon, Atlassian
 *
 * Problem Summary:
 * Implement `promiseAll(promises)` which resolves when all promises resolve or rejects when any promise rejects.
 *
 * Solution Explanation:
 * Track remaining unsettled promises; resolve once all have succeeded in order, reject immediately on the first failure.
 *
 * Approach Outline:
 * Wrap inputs with `Promise.resolve`, store results by index, decrement a counter on fulfillment, and `resolve` when it reaches zero.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - const values = await promiseAll([Promise.resolve(1), 2, Promise.resolve(3)]);
 *   - assert.deepStrictEqual(values, [1, 2, 3]);
 *   - await assert.rejects(async () => promiseAll([Promise.resolve(1), Promise.reject(new Error("fail"))]));
 */

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results = new Array(promises.length);
    let remaining = promises.length;
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value;
          remaining -= 1;
          if (remaining === 0) resolve(results);
        })
        .catch(reject);
    });
  });
}

module.exports = { promiseAll };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  (async () => {
    const values = await promiseAll([Promise.resolve(1), 2, Promise.resolve(3)]);
    assert.deepStrictEqual(values, [1, 2, 3]);
    await assert.rejects(async () => promiseAll([Promise.resolve(1), Promise.reject(new Error("fail"))]));
    console.log('All tests passed for Promise.all Polyfill.');
  })().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
