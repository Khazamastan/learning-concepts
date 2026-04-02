module.exports = register => {
  register('recoverWhenCacheBackfires', () => {
    function mitigation(plan) {
      return [
        'Fail open to the source of truth temporarily',
        'Add circuit breaker on cache misses',
        `Backfill cache with ${plan.preWarmStrategy}`,
      ];
    }
    return { mitigation };
  }, 'Incident response steps after a cache stampede causes user-facing errors.');
};
