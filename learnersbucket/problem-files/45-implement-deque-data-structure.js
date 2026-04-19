/**
 * Problem #45: Implement deque data structure
 *
 * Detailed Problem Statement:
 * Build double-ended queue supporting O(1) push/pop from both ends.
 *
 * Example Input:
 * const dq = new Deque();
 * dq.pushBack(1); dq.pushFront(2);
 *
 * Example Output:
 * popFront -> 2
 * popBack -> 1
 */

export const problem = `Implement deque data structure`;

export const statement = `
Build double-ended queue supporting O(1) push/pop from both ends.
`.trim();

export const exampleInput = `
const dq = new Deque();
dq.pushBack(1); dq.pushFront(2);
`.trim();

export const exampleOutput = `
popFront -> 2
popBack -> 1
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class Deque {
  constructor() {
    this.map = {};
    this.front = 0;
    this.back = -1;
  }

  pushFront(val) {
    this.front -= 1;
    this.map[this.front] = val;
  }

  pushBack(val) {
    this.back += 1;
    this.map[this.back] = val;
  }

  popFront() {
    if (this.isEmpty()) return undefined;
    const val = this.map[this.front];
    delete this.map[this.front];
    this.front += 1;
    return val;
  }

  popBack() {
    if (this.isEmpty()) return undefined;
    const val = this.map[this.back];
    delete this.map[this.back];
    this.back -= 1;
    return val;
  }

  isEmpty() {
    return this.front > this.back;
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
