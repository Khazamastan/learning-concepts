module.exports = register => {
  register('indexing', () => {
    const btreeIndex = new Map([
      ['A', [101, 142]],
      ['B', [201]],
    ]);
    function lookup(prefix) {
      return btreeIndex.get(prefix) || [];
    }
    return lookup;
  }, 'Retail search using B-tree indexes for fast prefix queries on SKU codes.');
};
