module.exports = register => {
  register('blastRadius', () => {
    function scopeChange(services, impacted) {
      return services.filter(service => impacted.includes(service.domain));
    }
    return scopeChange;
  }, 'Feature flag rollout limiting failures to a single business domain.');
};
