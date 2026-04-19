/**
 * Problem #31: Process async callbacks queue
 *
 * Detailed Problem Statement:
 * Given async callbacks, execute them in order like a task queue.
 *
 * Example Input:
 * const q = new AsyncQueue();
 * q.push(async () => console.log('A'));
 * q.push(async () => console.log('B'));
 * q.start();
 *
 * Example Output:
 * A
 * B
 */

export const problem = `Process async callbacks queue`;

export const statement = `
Given async callbacks, execute them in order like a task queue.
`.trim();

export const exampleInput = `
const q = new AsyncQueue();
q.push(async () => console.log('A'));
q.push(async () => console.log('B'));
q.start();
`.trim();

export const exampleOutput = `
A
B
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.running = false;
  }

  push(task) {
    this.tasks.push(task);
    if (this.running) return;
  }

  async start() {
    if (this.running) return;
    this.running = true;
    while (this.tasks.length) {
      const task = this.tasks.shift();
      await task();
    }
    this.running = false;
  }
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
