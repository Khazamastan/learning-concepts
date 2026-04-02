/**
 * Title: Event Emitter (Pub/Sub)
 * Difficulty: Medium
 * Companies: Meta, Google, Amazon
 *
 * Problem Summary:
 * Implement an EventEmitter with `on`, `off`, `emit`, and `once` methods.
 *
 * Solution Explanation:
 * Maintain listeners per event. `once` wraps a listener that removes itself after first execution.
 *
 * Approach Outline:
 * Store event listeners in a map. On emit, call listeners with supplied arguments. Implement `once` by registering a wrapper that removes itself.
 *
 * Complexity:
 *   Time: O(n) emit
 *   Space: O(n)
 *
 * Tests:
 *   - const emitter = new EventEmitter();
 *   - let count = 0;
 *   - const listener = (value) => { count += value; };
 *   - emitter.on('inc', listener);
 *   - emitter.emit('inc', 2);
 *   - emitter.once('inc', (value) => { count += value * 2; });
 *   - emitter.emit('inc', 1);
 *   - emitter.emit('inc', 1);
 *   - emitter.off('inc', listener);
 *   - emitter.emit('inc', 1);
 *   - assert.strictEqual(count, 5);
 */

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events.has(event)) return this;
    this.events.set(event, this.events.get(event).filter((l) => l !== listener));
    return this;
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    for (const listener of [...this.events.get(event)]) {
      listener(...args);
    }
    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    this.on(event, wrapper);
    return this;
  }
}

module.exports = { EventEmitter };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const emitter = new EventEmitter();
  let count = 0;
  const listener = (value) => { count += value; };
  emitter.on('inc', listener);
  emitter.emit('inc', 2);
  emitter.once('inc', (value) => { count += value * 2; });
  emitter.emit('inc', 1);
  emitter.emit('inc', 1);
  emitter.off('inc', listener);
  emitter.emit('inc', 1);
  assert.strictEqual(count, 5);
  console.log('All tests passed for Event Emitter (Pub/Sub).');
}
