/**
 * Problem #21: Promise.all() polyfill
 *
 * Detailed Problem Statement:
 * Implement `promiseAll(promises)` that resolves when all promises resolve, or rejects on first rejection.
 *
 * Example Input:
 * promiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log);
 *
 * Example Output:
 * [1, 2]
 */

export const problem = `Promise.all() polyfill`;

export const statement = `
Implement \`promiseAll(promises)\` that resolves when all promises resolve, or rejects on first rejection.
`.trim();

export const exampleInput = `
promiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log);
`.trim();

export const exampleOutput = `
[1, 2]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    const result = new Array(arr.length);
    let done = 0;

    if (arr.length === 0) {
      resolve([]);
      return;
    }

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then((val) => {
          result[i] = val;
          done += 1;
          if (done === arr.length) resolve(result);
        })
        .catch(reject);
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
