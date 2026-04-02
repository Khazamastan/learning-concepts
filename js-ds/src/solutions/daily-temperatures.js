/**
 * Title: Daily Temperatures
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Atlassian
 *
 * Problem Summary:
 * Given an array `temperatures`, return an array where each entry is the number of days until a warmer temperature. If none, return 0.
 *
 * Solution Explanation:
 * A decreasing monotonic stack of indices waits for the next warmer day, ensuring each index is processed once.
 *
 * Approach Outline:
 * Iterate the temperatures, popping indices from the stack while the current temperature is higher, filling their answers, then push the current index.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.deepStrictEqual(dailyTemperatures([73,74,75,71,69,72,76,73]), [1,1,4,2,1,1,0,0]);
 *   - assert.deepStrictEqual(dailyTemperatures([30,40,50,60]), [1,1,1,0]);
 */

function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i += 1) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}

module.exports = { dailyTemperatures };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(dailyTemperatures([73,74,75,71,69,72,76,73]), [1,1,4,2,1,1,0,0]);
  assert.deepStrictEqual(dailyTemperatures([30,40,50,60]), [1,1,1,0]);
  console.log('All tests passed for Daily Temperatures.');
}
