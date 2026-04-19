/**
 * Problem: Create composeAsync function with chaining support.
 * Example Input:
 *   const fn = composeAsync(x => x * 2, async x => x + 1); await fn(10)
 * Example Output:
 *   22
 */
export function composeAsync(...fns) {
  return function (input) {
    return fns.reduceRight(
      (chain, fn) => chain.then((val) => fn(val)),
      Promise.resolve(input)
    );
  };
}

/**
 * Problem: Implement mapLimit async function.
 * Example Input:
 *   await mapLimit([1,2,3,4], 2, async x => x * 2)
 * Example Output:
 *   [2,4,6,8]
 */
export async function mapLimit(items, limit, mapper) {
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

/**
 * Problem: Process async callbacks queue.
 * Example Input:
 *   const q = new AsyncQueue(); q.push(asyncTaskA); q.push(asyncTaskB); await q.start();
 * Example Output:
 *   tasks run in FIFO order
 */
export class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.running = false;
  }

  push(task) {
    this.tasks.push(task);
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
