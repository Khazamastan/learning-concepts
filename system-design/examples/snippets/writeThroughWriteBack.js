module.exports = register => {
  register('writeThroughWriteBack', () => {
    function writeThrough(cache, db, key, value) {
      cache.set(key, value);
      db.set(key, value);
      return { strategy: 'writeThrough', key, value };
    }
    function writeBack(cache, db, key, value) {
      cache.set(key, { value, dirty: true });
      return { strategy: 'writeBack', key, value };
    }
    return { writeThrough, writeBack };
  }, 'Inventory service comparing synchronous and deferred persistence strategies.');
};
