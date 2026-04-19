/**
 * Problem #29: Create composeAsync function with chaining support
 *
 * Detailed Problem Statement:
 * Implement `composeAsync(...fns)` that executes right-to-left and supports async functions.
 *
 * Example Input:
 * const add1 = async (x) => x + 1;
 * const double = async (x) => x * 2;
 * const fn = composeAsync(double, add1);
 * fn(10).then(console.log);
 *
 * Example Output:
 * 22
 */

export const problem = `Create composeAsync function with chaining support`;

export const statement = `
Implement \`composeAsync(...fns)\` that executes right-to-left and supports async functions.
`.trim();

export const exampleInput = `
const add1 = async (x) => x + 1;
const double = async (x) => x * 2;
const fn = composeAsync(double, add1);
fn(10).then(console.log);
`.trim();

export const exampleOutput = `
22
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function composeAsync(...fns) {
  return function (input) {
    return fns.reduceRight(
      (chain, fn) => chain.then((val) => fn(val)),
      Promise.resolve(input)
    );
  };
}

// ---------------------------
// Approach 2: async/await control flow
// ---------------------------
async function solveAsyncAwait(tasks) {
  const out = [];
  for (const task of tasks) {
    out.push(await task());
  }
  return out;
}

// ---------------------------
// Approach 3: Promise combinator flow
// ---------------------------
function solveWithPromises(tasks) {
  return Promise.all(tasks.map((task) => Promise.resolve().then(task)));
}
