/**
 * Problem #40: Filter array of objects on value or index
 *
 * Detailed Problem Statement:
 * Implement filter utility that can filter by object field value or by index predicate.
 *
 * Example Input:
 * const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * filterObjects(arr, { key: 'id', value: 2 });
 * filterObjects(arr, { indexPredicate: (i) => i % 2 === 0 });
 *
 * Example Output:
 * [{id:2}]
 * [{id:1},{id:3}]
 */

export const problem = `Filter array of objects on value or index`;

export const statement = `
Implement filter utility that can filter by object field value or by index predicate.
`.trim();

export const exampleInput = `
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
filterObjects(arr, { key: 'id', value: 2 });
filterObjects(arr, { indexPredicate: (i) => i % 2 === 0 });
`.trim();

export const exampleOutput = `
[{id:2}]
[{id:1},{id:3}]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function filterObjects(arr, options) {
  const { key, value, indexPredicate } = options;
  return arr.filter((item, index) => {
    const byValue = key !== undefined ? item[key] === value : true;
    const byIndex = indexPredicate ? indexPredicate(index) : true;
    return byValue && byIndex;
  });
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
