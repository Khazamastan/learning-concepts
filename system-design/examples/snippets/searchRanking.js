module.exports = register => {
  register('searchRanking', () => {
    function rank(results, query) {
      return results
        .map(doc => ({
          doc,
          score: doc.popularity * 0.4 + doc.recencyDays * -0.2 + (doc.text.includes(query) ? 10 : 0),
        }))
        .sort((a, b) => b.score - a.score)
        .map(item => item.doc.id);
    }
    return rank;
  }, 'Marketplace ranking listings by relevance, popularity, and freshness.');
};
