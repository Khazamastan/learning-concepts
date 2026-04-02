module.exports = register => {
  register('designingUber', () => {
    function matchRider(rider, drivers) {
      return drivers
        .filter(driver => driver.status === 'available')
        .sort((a, b) => a.distanceKm - b.distanceKm)[0] || null;
    }
    return matchRider;
  }, 'Ride-hailing platform pairing riders with the nearest available driver.');
};
