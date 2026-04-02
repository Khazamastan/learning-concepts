export async function requestWithTimeout(requestFn, { timeout = 3000, retries = 0, retryDelay = 0 } = {}) {
  if (typeof requestFn !== "function") {
    throw new TypeError("requestWithTimeout expects a function that returns a promise");
  }

  let attempt = 0;
  let lastError;

  while (attempt <= retries) {
    try {
      return await runWithTimeout(requestFn, timeout);
    } catch (error) {
      lastError = error;
      if (attempt === retries) {
        throw lastError;
      }
      await delay(retryDelay);
      attempt += 1;
    }
  }

  throw lastError;
}

async function runWithTimeout(requestFn, timeout) {
  return await Promise.race([
    requestFn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Request timed out after ${timeout}ms`)), timeout),
    ),
  ]);
}

function delay(ms) {
  if (!ms) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}
