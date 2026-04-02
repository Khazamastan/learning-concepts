module.exports = register => {
  register('sharding', () => {
    function shardUser(userId, shardCount) {
      const shardId = userId % shardCount;
      return { userId, shardId };
    }
    return shardUser;
  }, 'Social network splitting users across shards to distribute profile reads.');
};
