/**
 * Problem #18: Polyfill for Array.map
 *
 * Detailed Problem Statement:
 * Implement behavior similar to native `Array.prototype.map`.
 *
 * Example Input:
 * [1, 2, 3].myMap((n) => n * n);
 *
 * Example Output:
 * [1, 4, 9]
 */

export const problem = `Polyfill for Array.map`;

export const statement = `
Implement behavior similar to native \`Array.prototype.map\`.
`.trim();

export const exampleInput = `
[1, 2, 3].myMap((n) => n * n);
`.trim();

export const exampleOutput = `
[1, 4, 9]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (callback, thisArg) {
    if (typeof callback !== 'function') throw new TypeError('callback must be function');
    const arr = Object(this);
    const out = new Array(arr.length);
    for (let i = 0; i < arr.length; i += 1) {
      if (i in arr) out[i] = callback.call(thisArg, arr[i], i, arr);
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
