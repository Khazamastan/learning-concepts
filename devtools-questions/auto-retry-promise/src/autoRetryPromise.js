/**
 * Retry an async function with exponential backoff.
 * @param {() => Promise<any>} task - asynchronous task to execute.
 * @param {{retries?: number, delay?: number, factor?: number, shouldRetry?: (error: any, attempt: number) => boolean}} [options]
 * @returns {Promise<any>}
 */
export async function autoRetry(task, options = {}) {
  const {
    retries = 3,
    delay = 100,
    factor = 2,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;
  let wait = Math.max(0, delay);

  while (attempt <= retries) {
    try {
      return await task();
    } catch (error) {
      if (attempt === retries || !shouldRetry(error, attempt)) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, wait));
      wait *= factor;
      attempt += 1;
    }
  }

  throw new Error('autoRetry exhausted without resolving.');
}
