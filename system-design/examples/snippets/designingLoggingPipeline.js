module.exports = register => {
  register('designingLoggingPipeline', () => {
    const sinks = [];
    function registerSink(sink) {
      sinks.push(sink);
    }
    function ingest(entry) {
      sinks.forEach(sink => sink(entry));
    }
    return { registerSink, ingest };
  }, 'Centralized log pipeline fan-out to storage and alerting backends.');
};
