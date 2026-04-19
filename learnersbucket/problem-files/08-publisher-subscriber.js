/**
 * Problem #8: Publisher-Subscriber
 *
 * Detailed Problem Statement:
 * Implement an event emitter with `on`, `off`, and `emit`.
 *
 * Example Input:
 * const bus = new EventBus();
 * const unsub = bus.on('msg', (x) => console.log('A', x));
 * bus.emit('msg', 42);
 * unsub();
 * bus.emit('msg', 99);
 *
 * Example Output:
 * A 42
 */

export const problem = `Publisher-Subscriber`;

export const statement = `
Implement an event emitter with \`on\`, \`off\`, and \`emit\`.
`.trim();

export const exampleInput = `
const bus = new EventBus();
const unsub = bus.on('msg', (x) => console.log('A', x));
bus.emit('msg', 42);
unsub();
bus.emit('msg', 99);
`.trim();

export const exampleOutput = `
A 42
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class EventBus {
  constructor() {
    this.map = new Map();
  }

  on(event, handler) {
    if (!this.map.has(event)) this.map.set(event, new Set());
    const set = this.map.get(event);
    set.add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    this.map.get(event)?.delete(handler);
  }

  emit(event, ...args) {
    this.map.get(event)?.forEach((h) => h(...args));
  }
}

// ---------------------------
// Approach 2: Class-based architecture
// ---------------------------
class Emitter {
  constructor() {
    this.events = new Map();
  }

  on(event, cb) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(cb);
    return () => this.off(event, cb);
  }

  off(event, cb) {
    this.events.get(event)?.delete(cb);
  }

  emit(event, ...args) {
    this.events.get(event)?.forEach((cb) => cb(...args));
  }
}

// ---------------------------
// Approach 3: Closure-based architecture
// ---------------------------
function createEmitter() {
  const map = new Map();
  return {
    on(event, cb) {
      if (!map.has(event)) map.set(event, new Set());
      map.get(event).add(cb);
      return () => map.get(event)?.delete(cb);
    },
    emit(event, ...args) {
      map.get(event)?.forEach((cb) => cb(...args));
    }
  };
}
