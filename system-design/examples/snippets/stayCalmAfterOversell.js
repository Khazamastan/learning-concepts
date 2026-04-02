module.exports = register => {
  register('stayCalmAfterOversell', () => {
    const playbook = [
      'Freeze new sales and notify stakeholders',
      'Prioritize highest-impact customers',
      'Offer compensation or rebooking options',
    ];
    return { playbook };
  }, 'Booking platform handling an oversell crisis with structured communication.');
};
