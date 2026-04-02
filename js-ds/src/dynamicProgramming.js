// Dynamic Programming solutions covering classic problems.

/**
 * Problem: Climbing Stairs
 * Count ways to climb n steps taking 1 or 2 steps.
 * Solution: Fibonacci DP (O(n) time, O(1) space).
 */
export function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i += 1) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

/**
 * Problem: Minimum Cost Climbing Stairs
 * Minimum cost to reach top; can climb 1 or 2 steps from given costs.
 * Solution: DP storing min cost to reach each step.
 */
export function minCostClimbingStairs(cost) {
  let prev2 = 0;
  let prev1 = 0;
  for (let i = 2; i <= cost.length; i += 1) {
    const current = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

/**
 * Problem: House Robber
 * Max sum without robbing adjacent houses.
 * Solution: DP with two rolling variables (O(n) time).
 */
export function rob(nums) {
  let include = 0;
  let exclude = 0;
  for (const num of nums) {
    const newInclude = exclude + num;
    exclude = Math.max(exclude, include);
    include = newInclude;
  }
  return Math.max(include, exclude);
}

/**
 * Problem: House Robber II
 * Houses arranged in circle.
 * Solution: Rob either excluding first or last house.
 */
export function robCircular(nums) {
  if (nums.length === 1) return nums[0];
  const robLinear = (arr) => {
    let include = 0;
    let exclude = 0;
    for (const num of arr) {
      const newInclude = exclude + num;
      exclude = Math.max(exclude, include);
      include = newInclude;
    }
    return Math.max(include, exclude);
  };
  return Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
}

/**
 * Problem: Coin Change
 * Minimum coins to make amount or -1 if impossible.
 * Solution: Bottom-up DP over amount (O(amount * coins)).
 */
export function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let value = coin; value <= amount; value += 1) {
      dp[value] = Math.min(dp[value], dp[value - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Problem: Palindromic Substrings
 * Count palindromic substrings in string.
 * Solution: Expand around centers (O(n^2) time, O(1) space).
 */
export function countSubstrings(s) {
  let count = 0;
  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count += 1;
      left -= 1;
      right += 1;
    }
  };
  for (let i = 0; i < s.length; i += 1) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}

/**
 * Problem: Longest Palindromic Substring
 * Return longest palindromic substring.
 * Solution: Expand around center and track best window (O(n^2)).
 */
export function longestPalindrome(s) {
  if (s.length <= 1) return s;
  let bestStart = 0;
  let bestLength = 1;
  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      left -= 1;
      right += 1;
    }
  };
  for (let i = 0; i < s.length; i += 1) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(bestStart, bestStart + bestLength);
}

/**
 * Problem: Decode Ways
 * Count ways to decode digits using A=1..Z=26.
 * Solution: DP with two rolling variables (O(n) time).
 */
export function numDecodings(s) {
  if (s[0] === '0') return 0;
  let prev2 = 1;
  let prev1 = 1;
  for (let i = 1; i < s.length; i += 1) {
    let current = 0;
    if (s[i] !== '0') current += prev1;
    const twoDigit = Number(s.slice(i - 1, i + 1));
    if (twoDigit >= 10 && twoDigit <= 26) current += prev2;
    if (current === 0) return 0;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

/**
 * Problem: Maximum Subarray
 * Largest sum contiguous subarray.
 * Solution: Kadane's algorithm (O(n) time, O(1) space).
 */
export function maxSubArray(nums) {
  let best = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

/**
 * Problem: Maximum Product Subarray
 * Largest product contiguous subarray.
 * Solution: Track max/min ending here due to negatives (O(n) time).
 */
export function maxProduct(nums) {
  let maxSoFar = nums[0];
  let minSoFar = nums[0];
  let result = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    const num = nums[i];
    if (num < 0) [maxSoFar, minSoFar] = [minSoFar, maxSoFar];
    maxSoFar = Math.max(num, maxSoFar * num);
    minSoFar = Math.min(num, minSoFar * num);
    result = Math.max(result, maxSoFar);
  }
  return result;
}

/**
 * Problem: Word Break
 * Determine if string can be segmented into dictionary words.
 * Solution: DP where dp[i] true if prefix up to i can be segmented (O(n^2)).
 */
export function wordBreak(s, wordDict) {
  const dict = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

/**
 * Problem: Longest Increasing Subsequence
 * Return length of LIS.
 * Solution: Patience sorting with tails array (O(n log n)).
 */
export function lengthOfLIS(nums) {
  const tails = [];
  for (const num of nums) {
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    tails[left] = num;
  }
  return tails.length;
}

/**
 * Problem: Partition Equal Subset Sum
 * Determine if array can be partitioned into two subsets with equal sum.
 * Solution: 0/1 knapsack achieving sum/2 (O(n * sum)).
 */
export function canPartition(nums) {
  const total = nums.reduce((sum, num) => sum + num, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let s = target; s >= num; s -= 1) {
      dp[s] = dp[s] || dp[s - num];
    }
  }
  return dp[target];
}

/**
 * Problem: Coin Change II
 * Count combinations to make amount.
 * Solution: DP with outer coin loop to avoid duplicates (O(amount * coins)).
 */
export function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
    for (let value = coin; value <= amount; value += 1) {
      dp[value] += dp[value - coin];
    }
  }
  return dp[amount];
}

/**
 * Problem: Unique Paths
 * Number of unique paths from top-left to bottom-right in m x n grid moving only right/down.
 * Solution: DP filling grid with combinatorial counts (O(mn)).
 */
export function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);
  for (let row = 1; row < m; row += 1) {
    for (let col = 1; col < n; col += 1) {
      dp[col] += dp[col - 1];
    }
  }
  return dp[n - 1];
}
