/**
 * Problem #46: Find digital root of a number
 *
 * Detailed Problem Statement:
 * Repeatedly sum digits until one digit remains.
 *
 * Example Input:
 * digitalRoot(9875)
 *
 * Example Output:
 * 2  // 9+8+7+5=29, 2+9=11, 1+1=2
 */

export const problem = `Find digital root of a number`;

export const statement = `
Repeatedly sum digits until one digit remains.
`.trim();

export const exampleInput = `
digitalRoot(9875)
`.trim();

export const exampleOutput = `
2  // 9+8+7+5=29, 2+9=11, 1+1=2
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function digitalRoot(n) {
  while (n >= 10) {
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return n;
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
