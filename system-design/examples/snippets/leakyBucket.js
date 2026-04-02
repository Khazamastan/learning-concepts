module.exports = register => {
  register('leakyBucket', () => {
    function createLeakyBucket({ capacity, drainPerMs }) {
      let water = 0;
      let lastCheck = Date.now();
      return function add(drop = 1) {
        const now = Date.now();
        const leaked = (now - lastCheck) * drainPerMs;
        water = Math.max(0, water - leaked);
        lastCheck = now;
        if (water + drop > capacity) return false;
        water += drop;
        return true;
      };
    }
    return createLeakyBucket;
  }, 'Payment gateway enforcing steady processing despite request spikes.');
};
