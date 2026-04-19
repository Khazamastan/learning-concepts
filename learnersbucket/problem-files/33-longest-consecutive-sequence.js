/**
 * Problem #33: Longest Consecutive Sequence
 *
 * Detailed Problem Statement:
 * Given unsorted array, find length of longest consecutive integer sequence in O(n).
 *
 * Example Input:
 * [100, 4, 200, 1, 3, 2]
 *
 * Example Output:
 * 4 // sequence: 1,2,3,4
 */

export const problem = `Longest Consecutive Sequence`;

export const statement = `
Given unsorted array, find length of longest consecutive integer sequence in O(n).
`.trim();

export const exampleInput = `
[100, 4, 200, 1, 3, 2]
`.trim();

export const exampleOutput = `
4 // sequence: 1,2,3,4
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;

  for (const n of set) {
    if (!set.has(n - 1)) {
      let curr = n;
      let len = 1;
      while (set.has(curr + 1)) {
        curr += 1;
        len += 1;
      }
      best = Math.max(best, len);
    }
  }

  return best;
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
