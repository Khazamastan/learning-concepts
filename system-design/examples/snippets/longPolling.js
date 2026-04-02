module.exports = register => {
  register('longPolling', () => {
    function poll(fetchFn, intervalMs = 5000) {
      let active = true;
      async function loop() {
        while (active) {
          const result = await fetchFn();
          if (result.ready) return result;
          await new Promise(resolve => setTimeout(resolve, intervalMs));
        }
        return null;
      }
      return { stop: () => { active = false; }, promise: loop() };
    }
    return poll;
  }, 'Customer support dashboard checking for new tickets when WebSockets unavailable.');
};
