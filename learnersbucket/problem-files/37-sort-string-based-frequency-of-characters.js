/**
 * Problem #37: Sort string based frequency of characters
 *
 * Detailed Problem Statement:
 * Given string `s`, return chars sorted by descending frequency.
 *
 * Example Input:
 * "tree"
 *
 * Example Output:
 * "eetr" (or "eert")
 */

export const problem = `Sort string based frequency of characters`;

export const statement = `
Given string \`s\`, return chars sorted by descending frequency.
`.trim();

export const exampleInput = `
"tree"
`.trim();

export const exampleOutput = `
"eetr" (or "eert")
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function frequencySort(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([ch, c]) => ch.repeat(c))
    .join('');
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
