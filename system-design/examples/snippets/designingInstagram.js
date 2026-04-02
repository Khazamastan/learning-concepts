module.exports = register => {
  register('designingInstagram', () => {
    const posts = [];
    function createPost({ userId, imageUrl, caption }) {
      const post = { id: posts.length + 1, userId, imageUrl, caption, createdAt: Date.now() };
      posts.push(post);
      return post;
    }
    function listFeed(limit = 10) {
      return posts.slice(-limit).reverse();
    }
    return { createPost, listFeed };
  }, 'Photo sharing network assembling reverse-chronological home feeds.');
};
