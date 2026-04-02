module.exports = register => {
  register('slosSlas', () => {
    function evaluate({ successCount, totalCount, target }) {
      const successRate = successCount / totalCount;
      return { successRate, meets: successRate >= target };
    }
    return evaluate;
  }, 'Incident review checking if 99.95% uptime SLO held for the last quarter.');
};
