/**
 * Problem #30: Implement mapLimit async function
 *
 * Detailed Problem Statement:
 * Implement `mapLimit(items, limit, asyncMapper)` that processes at most `limit` promises concurrently.
 *
 * Example Input:
 * mapLimit([1, 2, 3, 4], 2, async (x) => x * 2).then(console.log);
 *
 * Example Output:
 * [2, 4, 6, 8]
 */

export const problem = `Implement mapLimit async function`;

export const statement = `
Implement \`mapLimit(items, limit, asyncMapper)\` that processes at most \`limit\` promises concurrently.
`.trim();

export const exampleInput = `
mapLimit([1, 2, 3, 4], 2, async (x) => x * 2).then(console.log);
`.trim();

export const exampleOutput = `
[2, 4, 6, 8]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
async function mapLimit(items, limit, mapper) {
  const result = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const current = nextIndex;
      nextIndex += 1;
      if (current >= items.length) break;
      result[current] = await mapper(items[current], current);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return result;
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
