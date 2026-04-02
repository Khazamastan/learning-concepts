module.exports = register => {
  register('idempotency', () => {
    const processed = new Set();
    function process(requestId, task) {
      if (processed.has(requestId)) {
        return 'duplicate';
      }
      task();
      processed.add(requestId);
      return 'processed';
    }
    return process;
  }, 'Payment processor preventing double-charging when clients retry requests.');
};
