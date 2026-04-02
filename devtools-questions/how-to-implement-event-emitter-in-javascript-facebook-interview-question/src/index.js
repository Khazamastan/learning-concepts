export class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    const handlers = this.events.get(event);
    handlers.add(handler);
    return () => this.off(event, handler);
  }

  once(event, handler) {
    const wrapped = (...args) => {
      handler(...args);
      this.off(event, wrapped);
    };
    return this.on(event, wrapped);
  }

  off(event, handler) {
    const handlers = this.events.get(event);
    if (!handlers) return;
    handlers.delete(handler);
    if (handlers.size === 0) {
      this.events.delete(event);
    }
  }

  emit(event, ...args) {
    const handlers = this.events.get(event);
    if (!handlers) return;
    [...handlers].forEach((handler) => {
      handler(...args);
    });
  }

  clear() {
    this.events.clear();
  }
}

const bus = new EventEmitter();
const unsubscribe = bus.on("message", (payload) => console.log("received", payload));
bus.once("message", (payload) => console.log("once", payload));

bus.emit("message", { text: "hello" });
bus.emit("message", { text: "world" });
unsubscribe();
bus.emit("message", { text: "no listeners" });
