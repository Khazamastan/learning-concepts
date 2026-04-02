module.exports = register => {
  register('rateLimiting', () => {
    const limits = new Map();
    function allow(userId, windowMs = 60000, maxCalls = 60) {
      const now = Date.now();
      const bucket = limits.get(userId) || { count: 0, windowStart: now };
      if (now - bucket.windowStart >= windowMs) {
        bucket.count = 0;
        bucket.windowStart = now;
      }
      if (bucket.count >= maxCalls) {
        return false;
      }
      bucket.count += 1;
      limits.set(userId, bucket);
      return true;
    }
    return { allow };
  }, 'Public API ensuring no client sends more than 60 requests per minute.');
};
