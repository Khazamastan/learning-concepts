/**
 * Problem #36: Implement browser history
 *
 * Detailed Problem Statement:
 * Support `visit(url)`, `back(steps)`, `forward(steps)`.
 *
 * Example Input:
 * const bh = new BrowserHistory('a.com');
 * bh.visit('b.com');
 * bh.visit('c.com');
 * bh.back(1);
 *
 * Example Output:
 * b.com
 */

export const problem = `Implement browser history`;

export const statement = `
Support \`visit(url)\`, \`back(steps)\`, \`forward(steps)\`.
`.trim();

export const exampleInput = `
const bh = new BrowserHistory('a.com');
bh.visit('b.com');
bh.visit('c.com');
bh.back(1);
`.trim();

export const exampleOutput = `
b.com
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class BrowserHistory {
  constructor(homepage) {
    this.history = [homepage];
    this.index = 0;
  }

  visit(url) {
    this.history = this.history.slice(0, this.index + 1);
    this.history.push(url);
    this.index += 1;
  }

  back(steps) {
    this.index = Math.max(0, this.index - steps);
    return this.history[this.index];
  }

  forward(steps) {
    this.index = Math.min(this.history.length - 1, this.index + steps);
    return this.history[this.index];
  }
}

// ---------------------------
// Approach 2: Brute-force baseline
// ---------------------------
function bruteForce(input) {
  // Try all candidates/pairs/ranges.
  // Validate each and keep the best.
  return input;
}

// ---------------------------
// Approach 3: Optimized with data structures
// ---------------------------
function optimized(input) {
  const state = new Map();
  // Build lookup/prefix/two-pointer state.
  // Return optimized result.
  return input;
}
