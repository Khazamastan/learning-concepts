module.exports = register => {
  register('scaleEstimation', () => {
    const dailyActiveUsers = 500000;
    const avgRequestsPerUser = 12;
    const peakFactor = 3;
    const peakQps = (dailyActiveUsers * avgRequestsPerUser) / (24 * 3600) * peakFactor;
    return { dailyActiveUsers, avgRequestsPerUser, peakFactor, peakQps: Math.ceil(peakQps) };
  }, 'Predicting peak load for a nationwide food delivery marketplace.');
};
