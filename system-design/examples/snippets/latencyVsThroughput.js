module.exports = register => {
  register('latencyVsThroughput', () => {
    const apiGatewayMeasurements = [
      { concurrent: 10, latencyMs: 80, throughputRps: 500 },
      { concurrent: 100, latencyMs: 140, throughputRps: 3200 },
      { concurrent: 500, latencyMs: 290, throughputRps: 9100 },
    ];
    const sweetSpot = apiGatewayMeasurements.find(run => run.latencyMs < 200 && run.throughputRps > 3000);
    return { apiGatewayMeasurements, sweetSpot };
  }, 'Video streaming API gateway balancing concurrency and response times.');
};
