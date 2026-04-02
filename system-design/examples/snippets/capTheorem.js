module.exports = register => {
  register('capTheorem', () => {
    const designChoices = {
      primaryGoal: 'partitionTolerance',
      secondaryGoal: 'availability',
      compromise: 'staleReadsAllowed',
    };
    return designChoices;
  }, 'Geo-distributed document store that must continue serving reads when a region is isolated.');
};
