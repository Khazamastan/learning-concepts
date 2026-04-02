module.exports = register => {
  register('rpoRto', () => {
    function evaluate({ lastBackupAt, outageStart, restoreCompleteAt }) {
      const rpoMinutes = (outageStart - lastBackupAt) / 60000;
      const rtoMinutes = (restoreCompleteAt - outageStart) / 60000;
      return { rpoMinutes, rtoMinutes };
    }
    return evaluate;
  }, 'Logistics platform tracking backup freshness and restore speed goals.');
};
