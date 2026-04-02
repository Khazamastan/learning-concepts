module.exports = register => {
  register('relationalVsDocumentVsKeyValue', () => {
    return {
      relational: { example: 'orders', schema: ['id', 'user_id', 'total'] },
      document: { example: 'user_profile', schema: 'flexible JSON' },
      keyValue: { example: 'session:token', schema: 'opaque blob' },
    };
  }, 'Marketplace separating transactional orders, rich profiles, and session tokens.');
};
