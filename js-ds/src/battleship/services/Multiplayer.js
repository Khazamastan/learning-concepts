class MultiplayerService {
  constructor({ socketFactory } = {}) {
    this.socketFactory = socketFactory;
    this.socket = null;
  }

  connect(url) {
    if (!this.socketFactory) {
      throw new Error('socketFactory is required to establish a connection');
    }
    this.socket = this.socketFactory(url);
    return this.socket;
  }

  emit(event, payload) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit(event, payload);
  }

  on(event, handler) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.on(event, handler);
  }
}

module.exports = MultiplayerService;
