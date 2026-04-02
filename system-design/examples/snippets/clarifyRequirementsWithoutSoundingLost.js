module.exports = register => {
  register('clarifyRequirementsWithoutSoundingLost', () => {
    function ask(question) {
      return `Just to confirm, ${question}?`;
    }
    const checklist = [
      'Restate the user value you heard',
      'Ask about success metrics',
      'Confirm constraints like latency or budget',
    ];
    return { ask, checklist };
  }, 'Interview technique to clarify scope while sounding confident.');
};
