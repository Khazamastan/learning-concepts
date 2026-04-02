import { autoRetry } from './autoRetryPromise.js';

let attempt = 0;

async function flakyTask() {
  attempt += 1;
  if (attempt < 3) {
    throw new Error(`Transient failure on attempt ${attempt}`);
  }
  return `Succeeded on attempt ${attempt}`;
}

autoRetry(flakyTask, { retries: 5, delay: 50, factor: 1.5 })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('Operation failed:', error.message);
  });
