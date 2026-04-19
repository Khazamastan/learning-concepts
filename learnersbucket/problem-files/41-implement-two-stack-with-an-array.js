/**
 * Problem #41: Implement two stack with an array
 *
 * Detailed Problem Statement:
 * Use one array to maintain two stacks growing toward each other.
 *
 * Example Input:
 * const ds = new TwoStacks(5);
 * ds.push1(10); ds.push2(20);
 *
 * Example Output:
 * pop1 -> 10
 * pop2 -> 20
 */

export const problem = `Implement two stack with an array`;

export const statement = `
Use one array to maintain two stacks growing toward each other.
`.trim();

export const exampleInput = `
const ds = new TwoStacks(5);
ds.push1(10); ds.push2(20);
`.trim();

export const exampleOutput = `
pop1 -> 10
pop2 -> 20
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class TwoStacks {
  constructor(size) {
    this.arr = new Array(size);
    this.top1 = -1;
    this.top2 = size;
  }

  push1(x) {
    if (this.top1 + 1 === this.top2) throw new Error('Overflow');
    this.arr[++this.top1] = x;
  }

  push2(x) {
    if (this.top1 + 1 === this.top2) throw new Error('Overflow');
    this.arr[--this.top2] = x;
  }

  pop1() {
    if (this.top1 < 0) throw new Error('Underflow');
    return this.arr[this.top1--];
  }

  pop2() {
    if (this.top2 >= this.arr.length) throw new Error('Underflow');
    return this.arr[this.top2++];
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
