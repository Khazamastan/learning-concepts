module.exports = register => {
  register('thunderingHerd', () => {
    function gate(requests, capacity) {
      const allowed = requests.slice(0, capacity);
      const queued = requests.slice(capacity);
      return { allowed, queued };
    }
    return gate;
  }, 'Breaking news alert system preventing simultaneous refresh storms.');
};
