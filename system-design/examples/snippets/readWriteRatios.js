module.exports = register => {
  register('readWriteRatios', () => {
    const productCatalogMetrics = {
      readsPerMinute: 20000,
      writesPerMinute: 150,
    };
    const ratio = productCatalogMetrics.readsPerMinute / productCatalogMetrics.writesPerMinute;
    return { ...productCatalogMetrics, ratio: Number(ratio.toFixed(2)) };
  }, 'E-commerce product catalog with heavy browsing and occasional updates.');
};
