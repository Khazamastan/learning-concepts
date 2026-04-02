module.exports = register => {
  register('fanout', () => {
    function fanoutToFollowers(postId, followers) {
      return followers.map(followerId => ({ followerId, postId }));
    }
    return fanoutToFollowers;
  }, 'Social app distributing new post notifications to follower inboxes.');
};
