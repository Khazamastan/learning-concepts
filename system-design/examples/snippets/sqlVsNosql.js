module.exports = register => {
  register('sqlVsNosql', () => {
    function pickStore({ requiresTransactions, documentShapeStable }) {
      if (requiresTransactions) return 'PostgreSQL';
      if (!documentShapeStable) return 'MongoDB';
      return 'DynamoDB';
    }
    return pickStore;
  }, 'Digital wallet platform mapping workloads to relational or document databases.');
};
