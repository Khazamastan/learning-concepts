module.exports = register => {
  register('designingNotificationSystem', () => {
    const queue = [];
    function schedule(notification) {
      queue.push({ ...notification, status: 'scheduled' });
    }
    function dispatch() {
      return queue.splice(0).map(item => ({ ...item, status: 'sent', sentAt: Date.now() }));
    }
    return { schedule, dispatch };
  }, 'Cross-channel notification service orchestrating email and push campaigns.');
};
