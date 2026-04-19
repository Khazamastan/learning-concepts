/**
 * Problem #12: Implement clearAllTimeout
 *
 * Detailed Problem Statement:
 * Build wrappers so you can clear all active `setTimeout` callbacks in one call.
 *
 * Example Input:
 * const manager = createTimeoutManager();
 * manager.set(() => console.log('A'), 1000);
 * manager.set(() => console.log('B'), 2000);
 * manager.clearAll();
 *
 * Example Output:
 * (no output)
 */

export const problem = `Implement clearAllTimeout`;

export const statement = `
Build wrappers so you can clear all active \`setTimeout\` callbacks in one call.
`.trim();

export const exampleInput = `
const manager = createTimeoutManager();
manager.set(() => console.log('A'), 1000);
manager.set(() => console.log('B'), 2000);
manager.clearAll();
`.trim();

export const exampleOutput = `
(no output)
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function createTimeoutManager() {
  const ids = new Set();

  function set(fn, delay, ...args) {
    const id = setTimeout(() => {
      ids.delete(id);
      fn(...args);
    }, delay);
    ids.add(id);
    return id;
  }

  function clearAll() {
    ids.forEach((id) => clearTimeout(id));
    ids.clear();
  }

  return { set, clearAll };
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
