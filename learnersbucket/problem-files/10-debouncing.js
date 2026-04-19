/**
 * Problem #10: Debouncing
 *
 * Detailed Problem Statement:
 * Implement `debounce(fn, delay)` so `fn` runs only after the calls stop for `delay` ms.
 *
 * Example Input:
 * const debounced = debounce(console.log, 300);
 * debounced('a');
 * debounced('b');
 * debounced('c');
 *
 * Example Output:
 * (after 300ms of silence) c
 */

export const problem = `Debouncing`;

export const statement = `
Implement \`debounce(fn, delay)\` so \`fn\` runs only after the calls stop for \`delay\` ms.
`.trim();

export const exampleInput = `
const debounced = debounce(console.log, 300);
debounced('a');
debounced('b');
debounced('c');
`.trim();

export const exampleOutput = `
(after 300ms of silence) c
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
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
