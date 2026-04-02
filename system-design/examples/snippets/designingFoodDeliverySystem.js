module.exports = register => {
  register('designingFoodDeliverySystem', () => {
    function assignOrder(order, couriers) {
      return couriers
        .filter(courier => courier.capacity > 0)
        .sort((a, b) => a.etaMinutes - b.etaMinutes)[0] || null;
    }
    return assignOrder;
  }, 'Food delivery marketplace dispatching riders with best ETA.');
};
