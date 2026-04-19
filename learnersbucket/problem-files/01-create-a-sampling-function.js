/**
 * Problem #1: Create a Sampling function
 *
 * Detailed Problem Statement:
 * Implement `sample(fn, wait)` that invokes `fn` at most once in every `wait` ms, but always with the latest arguments seen during that interval.
 *
 * Example Input:
 * const sampled = sample((x) => console.log(x), 1000);
 * sampled(1);
 * sampled(2);
 * sampled(3); // only this should be used when timer fires
 *
 * Example Output:
 * (after ~1s) 3
 */

export const problem = `Create a Sampling function`;

export const statement = `
Implement \`sample(fn, wait)\` that invokes \`fn\` at most once in every \`wait\` ms, but always with the latest arguments seen during that interval.
`.trim();

export const exampleInput = `
const sampled = sample((x) => console.log(x), 1000);
sampled(1);
sampled(2);
sampled(3); // only this should be used when timer fires
`.trim();

export const exampleOutput = `
(after ~1s) 3
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function sample(fn, wait) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;

  return function (...args) {
    lastArgs = args;
    lastThis = this;

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(lastThis, lastArgs);
        timer = null;
        lastArgs = null;
        lastThis = null;
      }, wait);
    }
  };
}

// ---------------------------
// Approach 2: Timestamp gate
// ---------------------------
function createTimedHandler(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}

// ---------------------------
// Approach 3: Timer gate
// ---------------------------
function createDeferredHandler(fn, wait) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
