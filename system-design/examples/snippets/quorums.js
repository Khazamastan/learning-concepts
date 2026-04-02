module.exports = register => {
  register('quorums', () => {
    function hasQuorum(acks, total, requiredFraction = 0.5) {
      return acks / total >= requiredFraction;
    }
    return hasQuorum;
  }, 'Document database ensuring majority acknowledgement before committing updates.');
};
