const original = {
  id: 'xhdyt0123',
  link: 'https://www.youtube.com/watch?v=_eaCs-pzaVg',
  metadata: {
    title: 'Build Your Own Redux',
    description: 'In this video we are going to see how we can build our own Redux',
  },
  published: true,
};

const duplicate = (post) => {
  if (!post.published) {
    throw new Error('Your post needs to be published before duplication');
  }

  const copy = {
    id: Date.now(),
    link: post.link,
    metadata: post.metadata,
    published: post.published,
  };

  copy.metadata.title = `Copy of ${post.metadata.title}`;

  return copy;
};

const cloned = duplicate(original);

console.log('Original title ->', original.metadata.title);
console.log('Cloned title    ->', cloned.metadata.title);
