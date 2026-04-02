module.exports = register => {
  register('distributedLocks', () => {
    const locks = new Map();
    function acquire(resourceId, owner, ttlMs) {
      const now = Date.now();
      const current = locks.get(resourceId);
      if (current && current.expiresAt > now) {
        return false;
      }
      locks.set(resourceId, { owner, expiresAt: now + ttlMs });
      return true;
    }
    return { acquire };
  }, 'Flash sale inventory reserving items with Redis-style distributed locks.');
};
