/**
 * Problem #43: Trapping rain water
 *
 * Detailed Problem Statement:
 * Given heights array, compute total trapped water.
 *
 * Example Input:
 * [0,1,0,2,1,0,1,3,2,1,2,1]
 *
 * Example Output:
 * 6
 */

export const problem = `Trapping rain water`;

export const statement = `
Given heights array, compute total trapped water.
`.trim();

export const exampleInput = `
[0,1,0,2,1,0,1,3,2,1,2,1]
`.trim();

export const exampleOutput = `
6
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left += 1;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right -= 1;
    }
  }

  return water;
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
