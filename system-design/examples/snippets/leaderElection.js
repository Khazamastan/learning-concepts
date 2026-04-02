module.exports = register => {
  register('leaderElection', () => {
    function electLeader(nodes) {
      return nodes.reduce((current, node) => (node.heartbeat > current.heartbeat ? node : current));
    }
    return electLeader;
  }, 'Distributed cache picking the healthiest node to coordinate writes.');
};
