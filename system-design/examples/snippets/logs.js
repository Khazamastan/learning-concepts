module.exports = register => {
  register('logs', () => {
    const entries = [];
    function log(level, message, context = {}) {
      entries.push({ timestamp: new Date().toISOString(), level, message, context });
    }
    return { log, entries };
  }, 'Compliance audit trail capturing admin actions with rich metadata.');
};
