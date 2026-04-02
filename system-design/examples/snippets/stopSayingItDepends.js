module.exports = register => {
  register('stopSayingItDepends', () => {
    function decide(option, constraint) {
      return `Given our priority for ${constraint}, we should choose ${option}.`;
    }
    return { decide };
  }, 'Practice reframing trade-offs into decisive recommendations.');
};
