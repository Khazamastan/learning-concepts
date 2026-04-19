/**
 * Problem #7: Currying
 *
 * Detailed Problem Statement:
 * Convert `sum(a, b, c)` into curried form `sumCurried(a)(b)(c)`.
 *
 * Example Input:
 * const sum = (a, b, c) => a + b + c;
 * const curried = curry(sum);
 * console.log(curried(1)(2)(3));
 *
 * Example Output:
 * 6
 */

export const problem = `Currying`;

export const statement = `
Convert \`sum(a, b, c)\` into curried form \`sumCurried(a)(b)(c)\`.
`.trim();

export const exampleInput = `
const sum = (a, b, c) => a + b + c;
const curried = curry(sum);
console.log(curried(1)(2)(3));
`.trim();

export const exampleOutput = `
6
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
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
