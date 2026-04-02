export class KeyValueStore {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Map();
  }

  set(key, value) {
    const previous = this.state[key];
    this.state[key] = value;
    this.emit(key, value, previous);
    this.emit("*", { key, value, previous });
  }

  get(key) {
    return this.state[key];
  }

  delete(key) {
    if (key in this.state) {
      const previous = this.state[key];
      delete this.state[key];
      this.emit(key, undefined, previous);
      this.emit("*", { key, value: undefined, previous });
      return true;
    }
    return false;
  }

  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(handler);
    }
  }

  emit(event, value, previous) {
    if (this.listeners.has(event)) {
      for (const handler of this.listeners.get(event)) {
        handler(value, previous);
      }
    }
  }
}
