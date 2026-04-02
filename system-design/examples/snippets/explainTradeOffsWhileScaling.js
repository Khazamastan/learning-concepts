module.exports = register => {
  register('explainTradeOffsWhileScaling', () => {
    function frame(counterArgument) {
      return `Scaling further means ${counterArgument} increases, so we mitigate with sharding and caching.`;
    }
    return { frame };
  }, 'Keep trade-off conversations grounded while addressing "scale it more" prompts.');
};
