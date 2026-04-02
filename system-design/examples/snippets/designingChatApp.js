module.exports = register => {
  register('designingChatApp', () => {
    const rooms = new Map();
    function postMessage(roomId, message) {
      const room = rooms.get(roomId) || [];
      room.push({ ...message, id: room.length + 1 });
      rooms.set(roomId, room);
      return room;
    }
    return { postMessage };
  }, 'Team collaboration chat storing ordered messages per room.');
};
