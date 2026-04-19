/**
 * Problem #42: Detect overlapping circles
 *
 * Detailed Problem Statement:
 * Given two circles `(x1,y1,r1)` and `(x2,y2,r2)`, check overlap.
 *
 * Example Input:
 * isOverlapping(0, 0, 5, 7, 0, 3);
 *
 * Example Output:
 * true
 */

export const problem = `Detect overlapping circles`;

export const statement = `
Given two circles \`(x1,y1,r1)\` and \`(x2,y2,r2)\`, check overlap.
`.trim();

export const exampleInput = `
isOverlapping(0, 0, 5, 7, 0, 3);
`.trim();

export const exampleOutput = `
true
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function isOverlapping(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= r1 + r2;
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
