module.exports = register => {
  register('costTradeOffs', () => {
    function compare(options) {
      return options.map(option => ({
        name: option.name,
        monthlyCost: option.instanceCount * option.instanceCost,
        utilization: option.utilization,
      }));
    }
    return compare;
  }, 'Infrastructure review weighing reserved instances vs spot fleets.');
};
