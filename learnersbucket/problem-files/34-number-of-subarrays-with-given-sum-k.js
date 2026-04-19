/**
 * Problem #34: Number of subarrays with given sum k
 *
 * Detailed Problem Statement:
 * Count subarrays whose sum equals `k`.
 *
 * Example Input:
 * nums = [1, 1, 1], k = 2
 *
 * Example Output:
 * 2
 */

export const problem = `Number of subarrays with given sum k`;

export const statement = `
Count subarrays whose sum equals \`k\`.
`.trim();

export const exampleInput = `
nums = [1, 1, 1], k = 2
`.trim();

export const exampleOutput = `
2
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function subarraySum(nums, k) {
  const freq = new Map([[0, 1]]);
  let prefix = 0;
  let count = 0;

  for (const n of nums) {
    prefix += n;
    count += freq.get(prefix - k) || 0;
    freq.set(prefix, (freq.get(prefix) || 0) + 1);
  }

  return count;
}

// ---------------------------
// Approach 2: Brute-force baseline
// ---------------------------
function bruteForce(input) {
  // Try all candidates/pairs/ranges.
  // Validate each and keep the best.
  return input;
}

// ---------------------------
// Approach 3: Optimized with data structures
// ---------------------------
function optimized(input) {
  const state = new Map();
  // Build lookup/prefix/two-pointer state.
  // Return optimized result.
  return input;
}
