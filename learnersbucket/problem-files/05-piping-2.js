/**
 * Problem #5: Piping-2
 *
 * Detailed Problem Statement:
 * Implement `pipe2(...fns)` where first function can take multiple args.
 *
 * Example Input:
 * const add = (a, b) => a + b;
 * const square = (x) => x * x;
 * pipe2(add, square)(2, 3);
 *
 * Example Output:
 * 25
 */

export const problem = `Piping-2`;

export const statement = `
Implement \`pipe2(...fns)\` where first function can take multiple args.
`.trim();

export const exampleInput = `
const add = (a, b) => a + b;
const square = (x) => x * x;
pipe2(add, square)(2, 3);
`.trim();

export const exampleOutput = `
25
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function pipe2(...fns) {
  return function (...args) {
    if (fns.length === 0) return args[0];
    const firstResult = fns[0](...args);
    return fns.slice(1).reduce((acc, fn) => fn(acc), firstResult);
  };
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
