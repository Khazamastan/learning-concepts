module.exports = register => {
  register('finishInterviewBeforeDiagramIsArt', () => {
    function timebox(phases) {
      let elapsed = 0;
      return phases.map(phase => {
        elapsed += phase.minutes;
        return { ...phase, cumulative: elapsed };
      });
    }
    return { timebox };
  }, 'Time management approach to wrap design interviews with a clean summary.');
};
