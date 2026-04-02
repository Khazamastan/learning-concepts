module.exports = register => {
  register('cacheInvalidation', () => {
    const cache = new Map([
      ['product:42', { name: 'Noise Cancelling Headphones', price: 199 }],
    ]);
    function invalidate(keyPattern) {
      for (const key of cache.keys()) {
        if (key.startsWith(keyPattern)) {
          cache.delete(key);
        }
      }
    }
    return { cache, invalidate };
  }, 'Merchandising team pushing price changes and clearing stale cached entries.');
};
