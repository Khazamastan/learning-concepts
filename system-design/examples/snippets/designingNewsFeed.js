module.exports = register => {
  register('designingNewsFeed', () => {
    function buildFeed(events, limit = 20) {
      return events
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    }
    return buildFeed;
  }, 'Publisher ranking headlines by engagement signals for homepage slots.');
};
