module.exports = register => {
  register('pubSub', () => {
    const subscribers = new Map();
    function subscribe(topic, handler) {
      const handlers = subscribers.get(topic) || [];
      handlers.push(handler);
      subscribers.set(topic, handlers);
    }
    function publish(topic, payload) {
      (subscribers.get(topic) || []).forEach(handler => handler(payload));
    }
    return { subscribe, publish };
  }, 'Real-time sports app broadcasting score updates to connected devices.');
};
