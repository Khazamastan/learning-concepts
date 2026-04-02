module.exports = register => {
  register('ttl', () => {
    const cache = new Map();
    return function setWithTtl(key, value, ttlMs) {
      const expiresAt = Date.now() + ttlMs;
      cache.set(key, { value, expiresAt });
      return { key, expiresAt };
    };
  }, 'Session service expiring cart previews after five minutes of inactivity.');
};
