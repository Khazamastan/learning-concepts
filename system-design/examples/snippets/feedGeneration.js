module.exports = register => {
  register('feedGeneration', () => {
    function mergeSources(userId, activities) {
      const combined = activities.flat().sort((a, b) => b.timestamp - a.timestamp);
      return combined.filter(item => item.visibleTo.includes(userId));
    }
    return mergeSources;
  }, 'Professional network composing personalized activity feeds from teams and topics.');
};
