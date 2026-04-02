module.exports = register => {
  register('traces', () => {
    function startTrace(name) {
      const spans = [];
      return {
        startSpan: spanName => {
          const span = { spanName, start: Date.now() };
          spans.push(span);
          return () => { span.end = Date.now(); };
        },
        spans,
      };
    }
    return startTrace;
  }, 'Checkout flow measuring end-to-end latency across microservices.');
};
