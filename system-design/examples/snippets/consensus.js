module.exports = register => {
  register('consensus', () => {
    function reachConsensus(votes) {
      const tally = votes.reduce((acc, vote) => {
        acc[vote] = (acc[vote] || 0) + 1;
        return acc;
      }, {});
      const [decision] = Object.entries(tally).sort((a, b) => b[1] - a[1]);
      return { decision: decision[0], tally };
    }
    return reachConsensus;
  }, 'Config service agreeing on rollout version using Raft-style majority voting.');
};
