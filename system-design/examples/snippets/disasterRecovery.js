module.exports = register => {
  register('disasterRecovery', () => {
    function simulateFailover(playbook) {
      return playbook.map(step => ({ ...step, executedAt: new Date().toISOString() }));
    }
    return simulateFailover;
  }, 'Bank running quarterly failover drills between primary and backup regions.');
};
