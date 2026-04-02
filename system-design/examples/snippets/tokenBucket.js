module.exports = register => {
  register('tokenBucket', () => {
    function createBucket({ capacity, refillPerSecond }) {
      let tokens = capacity;
      let lastRefill = Date.now();
      return function consume(amount = 1) {
        const now = Date.now();
        const elapsed = (now - lastRefill) / 1000;
        tokens = Math.min(capacity, tokens + elapsed * refillPerSecond);
        lastRefill = now;
        if (tokens < amount) return false;
        tokens -= amount;
        return true;
      };
    }
    return createBucket;
  }, 'Streaming API smoothing bursty traffic with elastic quotas per client.');
};
