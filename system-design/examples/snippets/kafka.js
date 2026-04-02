module.exports = register => {
  register('kafka', () => {
    const partitions = [[], [], []];
    function produce(event) {
      const partitionId = event.userId % partitions.length;
      partitions[partitionId].push(event);
      return { partitionId, offset: partitions[partitionId].length - 1 };
    }
    return { partitions, produce };
  }, 'Clickstream pipeline batching analytics events per user partition.');
};
