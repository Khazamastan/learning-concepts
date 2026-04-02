module.exports = register => {
  register('webSockets', () => {
    const { EventEmitter } = require('events');
    const hub = new EventEmitter();
    function connect(userId) {
      const channel = new EventEmitter();
      hub.on('message', payload => {
        if (payload.to === userId || payload.to === 'broadcast') {
          channel.emit('message', payload);
        }
      });
      return channel;
    }
    function send(from, to, message) {
      hub.emit('message', { from, to, message, ts: Date.now() });
    }
    return { connect, send };
  }, 'Collaborative whiteboard pushing live updates to all active clients.');
};
