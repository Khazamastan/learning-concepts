/**
 * Problem #15: Check performance of async and sync functions
 *
 * Detailed Problem Statement:
 * Measure execution time of sync and async functions.
 *
 * Example Input:
 * benchmarkSync(() => {
 *   for (let i = 0; i < 1e6; i += 1) {}
 * });
 * 
 * benchmarkAsync(async () => {
 *   await new Promise((r) => setTimeout(r, 100));
 * });
 *
 * Example Output:
 * Sync took: <some ms>
 * Async took: ~100 ms
 */

export const problem = `Check performance of async and sync functions`;

export const statement = `
Measure execution time of sync and async functions.
`.trim();

export const exampleInput = `
benchmarkSync(() => {
  for (let i = 0; i < 1e6; i += 1) {}
});

benchmarkAsync(async () => {
  await new Promise((r) => setTimeout(r, 100));
});
`.trim();

export const exampleOutput = `
Sync took: <some ms>
Async took: ~100 ms
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function benchmarkSync(fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
}

async function benchmarkAsync(fn) {
  const start = performance.now();
  await fn();
  const end = performance.now();
  return end - start;
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
