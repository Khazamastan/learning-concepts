/**
 * Problem #19: groupBy() polyfill
 *
 * Detailed Problem Statement:
 * Group array elements by key derived from callback.
 *
 * Example Input:
 * const users = [
 *   { name: 'A', role: 'dev' },
 *   { name: 'B', role: 'qa' },
 *   { name: 'C', role: 'dev' }
 * ];
 * console.log(groupBy(users, (u) => u.role));
 *
 * Example Output:
 * {
 *   dev: [{name:'A',role:'dev'}, {name:'C',role:'dev'}],
 *   qa: [{name:'B',role:'qa'}]
 * }
 */

export const problem = `groupBy() polyfill`;

export const statement = `
Group array elements by key derived from callback.
`.trim();

export const exampleInput = `
const users = [
  { name: 'A', role: 'dev' },
  { name: 'B', role: 'qa' },
  { name: 'C', role: 'dev' }
];
console.log(groupBy(users, (u) => u.role));
`.trim();

export const exampleOutput = `
{
  dev: [{name:'A',role:'dev'}, {name:'C',role:'dev'}],
  qa: [{name:'B',role:'qa'}]
}
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
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
