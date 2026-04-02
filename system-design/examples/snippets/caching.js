module.exports = register => {
  register('caching', () => {
    const cache = new Map();
    return function getProduct(productId, fetcher) {
      if (cache.has(productId)) {
        return { product: cache.get(productId), cacheHit: true };
      }
      const product = fetcher(productId);
      cache.set(productId, product);
      return { product, cacheHit: false };
    };
  }, 'Storefront caching product details to avoid repeated database hits.');
};
