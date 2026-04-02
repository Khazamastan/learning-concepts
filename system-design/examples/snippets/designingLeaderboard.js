module.exports = register => {
  register('designingLeaderboard', () => {
    const scores = new Map();
    function submitScore(playerId, score) {
      scores.set(playerId, Math.max(scores.get(playerId) || 0, score));
    }
    function top(n = 10) {
      return Array.from(scores.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
    }
    return { submitScore, top };
  }, 'Gaming platform maintaining high-score tables with only best attempts.');
};
