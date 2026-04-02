module.exports = register => {
  register('designingPaymentSystem', () => {
    function processPayment({ amount, currency, cardToken }) {
      if (amount <= 0) throw new Error('invalid amount');
      return {
        id: `txn_${Date.now()}`,
        amount,
        currency,
        cardToken,
        status: 'authorized',
      };
    }
    return processPayment;
  }, 'Online marketplace authorizing card payments before capture.');
};
