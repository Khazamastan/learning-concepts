module.exports = register => {
  register('metrics', () => {
    function createCounter(name) {
      let value = 0;
      return {
        inc: (amount = 1) => { value += amount; },
        value: () => ({ name, value }),
      };
    }
    return createCounter;
  }, 'API service tracking request throughput via Prometheus counters.');
};
