/**
 * Problem #3: Flatten an Array
 *
 * Detailed Problem Statement:
 * Implement `flatten(arr)` to flatten a deeply nested array into a single-level array.
 *
 * Example Input:
 * flatten([1, [2, [3, 4], 5], 6]);
 *
 * Example Output:
 * [1, 2, 3, 4, 5, 6]
 */

export const problem = `Flatten an Array`;

export const statement = `
Implement \`flatten(arr)\` to flatten a deeply nested array into a single-level array.
`.trim();

export const exampleInput = `
flatten([1, [2, [3, 4], 5], 6]);
`.trim();

export const exampleOutput = `
[1, 2, 3, 4, 5, 6]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function flatten(arr) {
  const out = [];

  function dfs(node) {
    for (const item of node) {
      if (Array.isArray(item)) dfs(item);
      else out.push(item);
    }
  }

  dfs(arr);
  return out;
}

// ---------------------------
// Approach 2: Closure-based variant
// ---------------------------
function buildClosureUtility(start = 0) {
  let state = start;
  return {
    next() {
      state += 1;
      return state;
    }
  };
}

// ---------------------------
// Approach 3: Generator-based variant
// ---------------------------
function* createGenerator(start = 0) {
  let value = start;
  while (true) {
    yield value;
    value += 1;
  }
}
