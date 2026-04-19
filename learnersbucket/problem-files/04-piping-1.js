/**
 * Problem #4: Piping-1
 *
 * Detailed Problem Statement:
 * Implement `pipe(...fns)` that composes functions left-to-right.
 *
 * Example Input:
 * const add2 = (x) => x + 2;
 * const square = (x) => x * x;
 * const fn = pipe(add2, square);
 * console.log(fn(3));
 *
 * Example Output:
 * 25
 */

export const problem = `Piping-1`;

export const statement = `
Implement \`pipe(...fns)\` that composes functions left-to-right.
`.trim();

export const exampleInput = `
const add2 = (x) => x + 2;
const square = (x) => x * x;
const fn = pipe(add2, square);
console.log(fn(3));
`.trim();

export const exampleOutput = `
25
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
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
