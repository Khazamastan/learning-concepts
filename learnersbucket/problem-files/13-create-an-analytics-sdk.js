/**
 * Problem #13: Create an analytics SDK
 *
 * Detailed Problem Statement:
 * Design a tiny analytics client supporting:
 * - `track(event, payload)`
 * - batching
 * - `flush()` to send pending events
 *
 * Example Input:
 * const sdk = new AnalyticsSDK({ batchSize: 2, send: console.log });
 * sdk.track('page_view', { path: '/' });
 * sdk.track('click', { id: 'buy-btn' });
 *
 * Example Output:
 * [
 *   {event:'page_view', payload:{path:'/'}},
 *   {event:'click', payload:{id:'buy-btn'}}
 * ]
 */

export const problem = `Create an analytics SDK`;

export const statement = `
Design a tiny analytics client supporting:
- \`track(event, payload)\`
- batching
- \`flush()\` to send pending events
`.trim();

export const exampleInput = `
const sdk = new AnalyticsSDK({ batchSize: 2, send: console.log });
sdk.track('page_view', { path: '/' });
sdk.track('click', { id: 'buy-btn' });
`.trim();

export const exampleOutput = `
[
  {event:'page_view', payload:{path:'/'}},
  {event:'click', payload:{id:'buy-btn'}}
]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class AnalyticsSDK {
  constructor({ batchSize = 5, send }) {
    this.batchSize = batchSize;
    this.send = send || (() => {});
    this.queue = [];
  }

  track(event, payload = {}) {
    this.queue.push({ event, payload, ts: Date.now() });
    if (this.queue.length >= this.batchSize) this.flush();
  }

  flush() {
    if (this.queue.length === 0) return;
    const batch = this.queue.splice(0, this.queue.length);
    this.send(batch);
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
