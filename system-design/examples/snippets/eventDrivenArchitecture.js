module.exports = register => {
  register('eventDrivenArchitecture', () => {
    const events = [];
    function emit(type, payload) {
      events.push({ type, payload });
    }
    function replay(filterType) {
      return events.filter(evt => !filterType || evt.type === filterType);
    }
    return { emit, replay };
  }, 'Travel booking platform orchestrating services through domain events.');
};
