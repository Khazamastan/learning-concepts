module.exports = register => {
  register('designingRateLimiter', () => {
    const attemptCounts = new Map();
    function allow(userId, windowMs = 1000, limit = 5) {
      const now = Date.now();
      const bucket = attemptCounts.get(userId) || [];
      const recent = bucket.filter(ts => now - ts <= windowMs);
      if (recent.length >= limit) {
        return false;
      }
      recent.push(now);
      attemptCounts.set(userId, recent);
      return true;
    }
    return { allow };
  }, 'Login API throttling repeated password attempts per user.');
};
