module.exports = register => {
  register('pickDatabaseAndDefendIt', () => {
    function choose(workload) {
      if (workload.requiresJoins) return 'PostgreSQL';
      if (workload.globalLowLatency) return 'Cassandra';
      return 'MongoDB';
    }
    function defend(choice) {
      return `We picked ${choice} because it aligns with our consistency and scaling needs.`;
    }
    return { choose, defend };
  }, 'Interview drill to back a single storage option with reasoning.');
};
