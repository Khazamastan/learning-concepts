module.exports = register => {
  register('deadLetterQueues', () => {
    const mainQueue = [];
    const deadLetter = [];
    function process(handler, maxAttempts = 3) {
      let processedCount = 0;
      while (mainQueue.length) {
        const job = mainQueue.shift();
        let success = false;
        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
          try {
            handler(job.payload);
            success = true;
            processedCount += 1;
            break;
          } catch (err) {
            job.failures = attempt;
          }
        }
        if (!success) {
          deadLetter.push(job);
        }
      }
      return { deadLetter, processed: processedCount };
    }
    function enqueue(payload) {
      mainQueue.push({ payload, failures: 0 });
    }
    return { enqueue, process, deadLetter };
  }, 'Email delivery worker isolating bad messages after repeated failures.');
};
