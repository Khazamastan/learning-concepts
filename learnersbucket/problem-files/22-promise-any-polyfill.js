/**
 * Problem #22: Promise.any() polyfill
 *
 * Detailed Problem Statement:
 * Implement `promiseAny(promises)` that resolves with first fulfilled promise; rejects only if all reject.
 *
 * Example Input:
 * promiseAny([
 *   Promise.reject('A'),
 *   new Promise((r) => setTimeout(() => r('B'), 100))
 * ]).then(console.log);
 *
 * Example Output:
 * B
 */

export const problem = `Promise.any() polyfill`;

export const statement = `
Implement \`promiseAny(promises)\` that resolves with first fulfilled promise; rejects only if all reject.
`.trim();

export const exampleInput = `
promiseAny([
  Promise.reject('A'),
  new Promise((r) => setTimeout(() => r('B'), 100))
]).then(console.log);
`.trim();

export const exampleOutput = `
B
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    const errors = new Array(arr.length);
    let rejectedCount = 0;

    if (arr.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          rejectedCount += 1;
          if (rejectedCount === arr.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
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
