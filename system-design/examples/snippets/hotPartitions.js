module.exports = register => {
  register('hotPartitions', () => {
    function detect(partitionStats, threshold) {
      return partitionStats.filter(stat => stat.qps > threshold);
    }
    return detect;
  }, 'Time-series database identifying shards overwhelmed by popular devices.');
};
