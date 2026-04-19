/**
 * Problem #16: Memoize a function
 *
 * Detailed Problem Statement:
 * Implement `memoize(fn)` that caches results for repeated inputs.
 *
 * Example Input:
 * const slowAdd = (a, b) => {
 *   console.log('compute');
 *   return a + b;
 * };
 * const fastAdd = memoize(slowAdd);
 * fastAdd(2, 3);
 * fastAdd(2, 3);
 *
 * Example Output:
 * compute
 * 5
 * 5
 */

export const problem = `Memoize a function`;

export const statement = `
Implement \`memoize(fn)\` that caches results for repeated inputs.
`.trim();

export const exampleInput = `
const slowAdd = (a, b) => {
  console.log('compute');
  return a + b;
};
const fastAdd = memoize(slowAdd);
fastAdd(2, 3);
fastAdd(2, 3);
`.trim();

export const exampleOutput = `
compute
5
5
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
}

// ---------------------------
// Approach 2: Iterative / Explicit State
// ---------------------------
function solveIterative(input) {
  // 1) Initialize state.
  // 2) Traverse input using loops.
  // 3) Update state explicitly.
  return input;
}

// ---------------------------
// Approach 3: Functional / Declarative
// ---------------------------
function solveFunctional(input) {
  return Array.isArray(input)
    ? input.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [])
    : input;
}
