module.exports = register => {
  register('multiAzMultiRegion', () => {
    return {
      regions: {
        'us-east-1': ['az-a', 'az-b'],
        'ap-south-1': ['az-a', 'az-b'],
      },
    };
  }, 'SaaS tenant routing ensuring redundancy across availability zones and regions.');
};
