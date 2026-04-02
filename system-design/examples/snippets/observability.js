module.exports = register => {
  register('observability', () => {
    const telemetry = { metrics: [], logs: [], traces: [] };
    return {
      recordMetric: metric => telemetry.metrics.push(metric),
      recordLog: log => telemetry.logs.push(log),
      recordTrace: trace => telemetry.traces.push(trace),
      snapshot: () => telemetry,
    };
  }, 'SaaS platform unifying telemetry pipelines for faster incident response.');
};
