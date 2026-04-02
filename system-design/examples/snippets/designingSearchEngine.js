module.exports = register => {
  register('designingSearchEngine', () => {
    const index = new Map();
    function addDocument(id, text) {
      text.split(/\W+/).forEach(token => {
        const key = token.toLowerCase();
        const bucket = index.get(key) || new Set();
        bucket.add(id);
        index.set(key, bucket);
      });
    }
    function search(term) {
      return Array.from(index.get(term.toLowerCase()) || []);
    }
    return { addDocument, search };
  }, 'Product search indexing keywords for instant lookup.');
};
