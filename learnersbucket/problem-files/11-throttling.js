/**
 * Problem #11: Throttling
 *
 * Detailed Problem Statement:
 * Implement `throttle(fn, wait)` to execute `fn` at most once every `wait` ms.
 *
 * Example Input:
 * const throttled = throttle(console.log, 1000);
 * throttled(1);
 * throttled(2);
 * setTimeout(() => throttled(3), 1100);
 *
 * Example Output:
 * 1
 * (after ~1.1s) 3
 */

export const problem = `Throttling`;

export const statement = `
Implement \`throttle(fn, wait)\` to execute \`fn\` at most once every \`wait\` ms.
`.trim();

export const exampleInput = `
const throttled = throttle(console.log, 1000);
throttled(1);
throttled(2);
setTimeout(() => throttled(3), 1100);
`.trim();

export const exampleOutput = `
1
(after ~1.1s) 3
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
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
