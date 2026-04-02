module.exports = register => {
  register('exactlyOnceVsAtLeastOnce', () => {
    function atLeastOnce(deliver) {
      const receipt = deliver();
      if (!receipt.ack) {
        return deliver();
      }
      return receipt;
    }
    function exactlyOnce(deliver, dedupeStore, id) {
      if (dedupeStore.has(id)) {
        return { ack: true, deduped: true };
      }
      const receipt = deliver();
      if (receipt.ack) dedupeStore.add(id);
      return receipt;
    }
    return { atLeastOnce, exactlyOnce };
  }, 'Order fulfillment service comparing delivery guarantees for warehouse events.');
};
