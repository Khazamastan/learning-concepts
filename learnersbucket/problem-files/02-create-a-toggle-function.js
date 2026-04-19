/**
 * Problem #2: Create a toggle function
 *
 * Detailed Problem Statement:
 * Create `toggle(...values)` that returns a function. On each call, it returns the next value in circular order.
 *
 * Example Input:
 * const onOff = toggle('ON', 'OFF');
 * console.log(onOff(), onOff(), onOff());
 *
 * Example Output:
 * ON OFF ON
 */

export const problem = `Create a toggle function`;

export const statement = `
Create \`toggle(...values)\` that returns a function. On each call, it returns the next value in circular order.
`.trim();

export const exampleInput = `
const onOff = toggle('ON', 'OFF');
console.log(onOff(), onOff(), onOff());
`.trim();

export const exampleOutput = `
ON OFF ON
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function toggle(...values) {
  let i = 0;
  return function () {
    const value = values[i % values.length];
    i += 1;
    return value;
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
