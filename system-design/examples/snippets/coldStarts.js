module.exports = register => {
  register('coldStarts', () => {
    function compare(invocations) {
      const cold = invocations.filter(inv => inv.type === 'cold');
      const warm = invocations.filter(inv => inv.type === 'warm');
      return {
        coldAvgMs: cold.reduce((acc, inv) => acc + inv.latencyMs, 0) / cold.length,
        warmAvgMs: warm.reduce((acc, inv) => acc + inv.latencyMs, 0) / warm.length,
      };
    }
    return compare;
  }, 'Serverless image resizer tracking latency impact from idle workers.');
};
