module.exports = register => {
  register('functionalRequirements', () => {
    const rideShareService = {
      requestRide: true,
      matchDriver: true,
      trackTrip: true,
      collectPayment: true,
    };
    return rideShareService;
  }, 'Ride-sharing platform capturing essential booking and trip tracking needs.');
};
