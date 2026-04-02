/**
 * Title: Coin Change
 * Difficulty: Medium
 * Companies: Amazon, Google, Meta, Microsoft
 *
 * Problem Summary:
 * Given coin denominations and a target amount, return the fewest number of coins needed to make up the amount, or -1 if it cannot be done.
 *
 * Solution Explanation:
 * Classic unbounded knapsack DP where `dp[i]` stores the minimum coins required to make amount `i`.
 *
 * Approach Outline:
 * Initialize `dp[0] = 0` and `Infinity` elsewhere. For each coin, update dp for all reachable amounts with `dp[i] = min(dp[i], dp[i - coin] + 1)`.
 *
 * Complexity:
 *   Time: O(amount * coins)
 *   Space: O(amount)
 *
 * Tests:
 *   - assert.strictEqual(coinChange([1,2,5], 11), 3);
 *   - assert.strictEqual(coinChange([2], 3), -1);
 */

function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let value = coin; value <= amount; value += 1) {
      dp[value] = Math.min(dp[value], dp[value - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

module.exports = { coinChange };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.strictEqual(coinChange([1,2,5], 11), 3);
  assert.strictEqual(coinChange([2], 3), -1);
  console.log('All tests passed for Coin Change.');
}
