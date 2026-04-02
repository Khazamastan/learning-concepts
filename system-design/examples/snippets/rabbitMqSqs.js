module.exports = register => {
  register('rabbitMqSqs', () => {
    const queue = [];
    function publish(message) {
      queue.push({ message, acked: false });
    }
    function consume() {
      const next = queue.find(item => !item.acked);
      if (!next) return null;
      next.acked = true;
      return next.message;
    }
    return { publish, consume };
  }, 'Retailer using managed queues for order confirmation workflows.');
};
