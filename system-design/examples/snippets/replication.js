module.exports = register => {
  register('replication', () => {
    function replicate(payload, replicas) {
      return replicas.map(node => ({ node, payload, status: 'queued' }));
    }
    return replicate;
  }, 'Payments ledger duplicating transactions across availability zones.');
};
