module.exports = register => {
  register('apiGateways', () => {
    function composeResponse(userId) {
      const profile = { userId, tier: 'gold' };
      const orders = [{ id: 'ord-101', total: 48.2 }];
      const recommendations = ['pro-plan', 'priority-support'];
      return { profile, orders, recommendations };
    }
    return composeResponse;
  }, 'Unified mobile API gateway stitching profile, order history, and recommendations.');
};
