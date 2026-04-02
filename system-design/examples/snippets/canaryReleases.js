module.exports = register => {
  register('canaryReleases', () => {
    function canary(percent) {
      return [
        { phase: 'canary', trafficPercent: percent },
        { phase: 'expand', trafficPercent: percent * 5 },
        { phase: 'full', trafficPercent: 100 },
      ];
    }
    return canary;
  }, 'Mobile backend exposing new API versions to 5% of users first.');
};
