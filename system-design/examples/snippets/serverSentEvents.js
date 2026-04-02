module.exports = register => {
  register('serverSentEvents', () => {
    function streamUpdates(events, controller) {
      for (const event of events) {
        controller.write(`data: ${JSON.stringify(event)}\n\n`);
      }
    }
    return streamUpdates;
  }, 'News site streaming live score updates over HTTP keep-alive connections.');
};
