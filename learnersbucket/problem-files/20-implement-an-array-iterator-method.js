/**
 * Problem #20: Implement an Array iterator method
 *
 * Detailed Problem Statement:
 * Create an iterator object with `next()` that returns `{ value, done }` for array traversal.
 *
 * Example Input:
 * const it = arrayIterator([10, 20]);
 * console.log(it.next(), it.next(), it.next());
 *
 * Example Output:
 * { value: 10, done: false }
 * { value: 20, done: false }
 * { value: undefined, done: true }
 */

export const problem = `Implement an Array iterator method`;

export const statement = `
Create an iterator object with \`next()\` that returns \`{ value, done }\` for array traversal.
`.trim();

export const exampleInput = `
const it = arrayIterator([10, 20]);
console.log(it.next(), it.next(), it.next());
`.trim();

export const exampleOutput = `
{ value: 10, done: false }
{ value: 20, done: false }
{ value: undefined, done: true }
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function arrayIterator(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      }
      return { value: undefined, done: true };
    }
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
