module.exports = register => {
  register('lruLfu', () => {
    const lru = [];
    const frequencies = new Map();
    function access(key) {
      const index = lru.indexOf(key);
      if (index !== -1) {
        lru.splice(index, 1);
      }
      lru.push(key);
      frequencies.set(key, (frequencies.get(key) || 0) + 1);
    }
    return { access, lru, frequencies };
  }, 'Content delivery edge tracking popular video chunks for eviction decisions.');
};
