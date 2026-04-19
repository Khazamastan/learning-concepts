/**
 * Problem #6: Method chaining
 *
 * Detailed Problem Statement:
 * Design a calculator class with chainable APIs like `.add()`, `.sub()`, `.mul()`, `.value()`.
 *
 * Example Input:
 * const result = new Calculator(10).add(5).sub(3).mul(2).value();
 *
 * Example Output:
 * 24
 */

export const problem = `Method chaining`;

export const statement = `
Design a calculator class with chainable APIs like \`.add()\`, \`.sub()\`, \`.mul()\`, \`.value()\`.
`.trim();

export const exampleInput = `
const result = new Calculator(10).add(5).sub(3).mul(2).value();
`.trim();

export const exampleOutput = `
24
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class Calculator {
  constructor(initial = 0) {
    this.total = initial;
  }

  add(n) {
    this.total += n;
    return this;
  }

  sub(n) {
    this.total -= n;
    return this;
  }

  mul(n) {
    this.total *= n;
    return this;
  }

  value() {
    return this.total;
  }
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
