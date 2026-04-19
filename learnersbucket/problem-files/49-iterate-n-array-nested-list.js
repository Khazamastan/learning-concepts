/**
 * Problem #49: Iterate N-array nested list
 *
 * Detailed Problem Statement:
 * Given n-level nested arrays, iterate and print leaf values in order.
 *
 * Example Input:
 * [1, [2, [3, 4], 5], [6]]
 *
 * Example Output:
 * 1 2 3 4 5 6
 */

export const problem = `Iterate N-array nested list`;

export const statement = `
Given n-level nested arrays, iterate and print leaf values in order.
`.trim();

export const exampleInput = `
[1, [2, [3, 4], 5], [6]]
`.trim();

export const exampleOutput = `
1 2 3 4 5 6
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function* iterateNested(list) {
  for (const item of list) {
    if (Array.isArray(item)) yield* iterateNested(item);
    else yield item;
  }
}

// usage
// [...iterateNested([1, [2, [3, 4], 5], [6]])] => [1,2,3,4,5,6]

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
