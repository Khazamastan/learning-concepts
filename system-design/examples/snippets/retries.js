module.exports = register => {
  register('retries', () => {
    async function retry(task, attempts = 3) {
      let delay = 50;
      for (let i = 0; i < attempts; i += 1) {
        try {
          return await task();
        } catch (err) {
          if (i === attempts - 1) throw err;
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
      return null;
    }
    return retry;
  }, 'Checkout service retrying idempotent calls to a flaky tax calculator.');
};
