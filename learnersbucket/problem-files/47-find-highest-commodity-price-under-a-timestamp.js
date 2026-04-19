/**
 * Problem #47: Find highest commodity price under a timestamp
 *
 * Detailed Problem Statement:
 * Given time-series price updates, answer max price up to query timestamp.
 *
 * Example Input:
 * updates = [
 *   { t: 1, p: 10 },
 *   { t: 3, p: 8 },
 *   { t: 5, p: 15 }
 * ]
 * query = 4
 *
 * Example Output:
 * 10
 */

export const problem = `Find highest commodity price under a timestamp`;

export const statement = `
Given time-series price updates, answer max price up to query timestamp.
`.trim();

export const exampleInput = `
updates = [
  { t: 1, p: 10 },
  { t: 3, p: 8 },
  { t: 5, p: 15 }
]
query = 4
`.trim();

export const exampleOutput = `
10
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function maxPriceUntil(updates, queryTime) {
  let ans = -Infinity;
  for (const { t, p } of updates) {
    if (t <= queryTime) ans = Math.max(ans, p);
  }
  return ans === -Infinity ? null : ans;
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
