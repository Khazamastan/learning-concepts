module.exports = register => {
  register('availabilityVsConsistency', () => {
    const orderLedger = {
      mode: 'eventualConsistency',
      compensationStrategy: 'saga',
      staleReadWindowMs: 500,
    };
    return orderLedger;
  }, 'Marketplace order ledger favoring availability during regional outages.');
};
