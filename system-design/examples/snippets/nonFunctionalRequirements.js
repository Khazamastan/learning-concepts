module.exports = register => {
  register('nonFunctionalRequirements', () => {
    const customerSupportPortal = {
      availabilityTarget: '99.9%',
      maxResponseTimeMs: 300,
      peakUsers: 12000,
      compliance: ['SOC2', 'GDPR'],
    };
    return customerSupportPortal;
  }, 'Customer support portal setting performance and compliance benchmarks.');
};
