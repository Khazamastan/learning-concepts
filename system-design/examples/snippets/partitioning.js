module.exports = register => {
  register('partitioning', () => {
    const partitions = new Map([
      ['NA', ['us-east', 'us-west']],
      ['APAC', ['ap-south', 'ap-southeast']],
    ]);
    return region => partitions.get(region) || [];
  }, 'Analytics warehouse grouping data by region to control query scans.');
};
