/**
 * Problem #9: Publisher-subscriber 2
 *
 * Detailed Problem Statement:
 * Extend pub-sub with `once(event, handler)` so a handler auto-unsubscribes after first emit.
 *
 * Example Input:
 * const bus = new EventBus2();
 * bus.once('ready', () => console.log('once'));
 * bus.emit('ready');
 * bus.emit('ready');
 *
 * Example Output:
 * once
 */

export const problem = `Publisher-subscriber 2`;

export const statement = `
Extend pub-sub with \`once(event, handler)\` so a handler auto-unsubscribes after first emit.
`.trim();

export const exampleInput = `
const bus = new EventBus2();
bus.once('ready', () => console.log('once'));
bus.emit('ready');
bus.emit('ready');
`.trim();

export const exampleOutput = `
once
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class EventBus2 {
  constructor() {
    this.events = new Map();
  }

  on(event, cb) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(cb);
    return () => this.off(event, cb);
  }

  once(event, cb) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      cb(...args);
    };
    return this.on(event, wrapper);
  }

  off(event, cb) {
    this.events.get(event)?.delete(cb);
  }

  emit(event, ...args) {
    this.events.get(event)?.forEach((cb) => cb(...args));
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
