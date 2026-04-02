module.exports = register => {
  register('backpressure', () => {
    function throttle(values, capacity) {
      const buffer = [];
      for (const value of values) {
        if (buffer.length === capacity) {
          break;
        }
        buffer.push(value);
      }
      return buffer;
    }
    return throttle;
  }, 'IoT ingestion pipeline shedding load to protect downstream services.');
};
