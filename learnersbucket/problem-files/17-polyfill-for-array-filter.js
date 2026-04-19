/**
 * Problem #17: Polyfill for Array.filter
 *
 * Detailed Problem Statement:
 * Implement behavior similar to native `Array.prototype.filter`.
 *
 * Example Input:
 * [1, 2, 3, 4].myFilter((n) => n % 2 === 0);
 *
 * Example Output:
 * [2, 4]
 */

export const problem = `Polyfill for Array.filter`;

export const statement = `
Implement behavior similar to native \`Array.prototype.filter\`.
`.trim();

export const exampleInput = `
[1, 2, 3, 4].myFilter((n) => n % 2 === 0);
`.trim();

export const exampleOutput = `
[2, 4]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (callback, thisArg) {
    if (typeof callback !== 'function') throw new TypeError('callback must be function');
    const arr = Object(this);
    const out = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
        out.push(arr[i]);
      }
    }
    return out;
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
