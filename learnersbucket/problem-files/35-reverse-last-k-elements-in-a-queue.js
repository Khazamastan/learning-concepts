/**
 * Problem #35: Reverse last k elements in a queue
 *
 * Detailed Problem Statement:
 * Given queue, reverse only last `k` elements.
 *
 * Example Input:
 * queue = [1,2,3,4,5], k = 3
 *
 * Example Output:
 * [1,2,5,4,3]
 */

export const problem = `Reverse last k elements in a queue`;

export const statement = `
Given queue, reverse only last \`k\` elements.
`.trim();

export const exampleInput = `
queue = [1,2,3,4,5], k = 3
`.trim();

export const exampleOutput = `
[1,2,5,4,3]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function reverseLastK(queue, k) {
  const n = queue.length;
  if (k <= 0 || k > n) return queue;

  const keep = queue.slice(0, n - k);
  const tail = queue.slice(n - k).reverse();
  return [...keep, ...tail];
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
