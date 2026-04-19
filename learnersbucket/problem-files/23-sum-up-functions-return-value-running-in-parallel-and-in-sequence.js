/**
 * Problem #23: Sum up functions return value running in parallel and in sequence
 *
 * Detailed Problem Statement:
 * Given async functions returning numbers, implement two helpers:
 * - `sumParallel(fns)` runs all at once
 * - `sumSequence(fns)` runs one-by-one
 *
 * Example Input:
 * const fns = [
 *   async () => 10,
 *   async () => 20,
 *   async () => 30
 * ];
 *
 * Example Output:
 * sumParallel -> 60
 * sumSequence -> 60
 */

export const problem = `Sum up functions return value running in parallel and in sequence`;

export const statement = `
Given async functions returning numbers, implement two helpers:
- \`sumParallel(fns)\` runs all at once
- \`sumSequence(fns)\` runs one-by-one
`.trim();

export const exampleInput = `
const fns = [
  async () => 10,
  async () => 20,
  async () => 30
];
`.trim();

export const exampleOutput = `
sumParallel -> 60
sumSequence -> 60
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
async function sumParallel(fns) {
  const values = await Promise.all(fns.map((fn) => fn()));
  return values.reduce((a, b) => a + b, 0);
}

async function sumSequence(fns) {
  let total = 0;
  for (const fn of fns) {
    total += await fn();
  }
  return total;
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
