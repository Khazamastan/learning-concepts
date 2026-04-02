module.exports = register => {
  register('rollbacks', () => {
    function rollback(history) {
      const previous = history.pop();
      const target = history[history.length - 1];
      return { rolledBackFrom: previous, active: target };
    }
    return rollback;
  }, 'Payments service reverting after spike in checkout errors.');
};
