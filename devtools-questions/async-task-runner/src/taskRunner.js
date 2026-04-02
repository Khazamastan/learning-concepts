/**
 * Create an asynchronous task runner with concurrency control.
 * @param {number} concurrency
 */
export function createTaskRunner(concurrency = 2) {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new Error('Concurrency must be a positive integer.');
  }

  const queue = [];
  let activeCount = 0;

  const next = () => {
    if (activeCount >= concurrency) {
      return;
    }
    const item = queue.shift();
    if (!item) {
      return;
    }

    activeCount += 1;
    const { task, resolve, reject } = item;

    Promise.resolve()
      .then(task)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        activeCount -= 1;
        next();
      });
  };

  return function enqueue(task) {
    return new Promise((resolve, reject) => {
      queue.push({ task, resolve, reject });
      next();
    });
  };
}
