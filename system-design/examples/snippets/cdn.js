module.exports = register => {
  register('cdn', () => {
    const edges = {
      'us-east': 'https://cdn.example.com/us-east/hero.jpg',
      'us-west': 'https://cdn.example.com/us-west/hero.jpg',
      'ap-south': 'https://cdn.example.com/ap-south/hero.jpg',
    };
    return function serve(region) {
      return edges[region] || edges['us-east'];
    };
  }, 'Global marketing site serving media assets from the closest edge location.');
};
