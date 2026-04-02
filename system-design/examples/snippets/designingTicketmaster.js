module.exports = register => {
  register('designingTicketmaster', () => {
    const seats = new Map();
    function holdSeat(eventId, seatId, userId, ttlMs) {
      const key = `${eventId}:${seatId}`;
      const existing = seats.get(key);
      if (existing && existing.expiresAt > Date.now()) {
        return false;
      }
      seats.set(key, { userId, expiresAt: Date.now() + ttlMs });
      return true;
    }
    return { holdSeat };
  }, 'Ticketing service locking seats briefly to prevent double booking.');
};
