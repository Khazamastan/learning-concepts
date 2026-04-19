/**
 * Problem: Debouncing.
 * Example Input:
 *   const fn = debounce(console.log, 300); fn('a'); fn('b'); fn('c');
 * Example Output:
 *   (after 300ms silence) c
 */
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Problem: Throttling.
 * Example Input:
 *   const fn = throttle(console.log, 1000); fn(1); fn(2);
 * Example Output:
 *   1
 */
export function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Problem: Implement clearAllTimeout.
 * Example Input:
 *   const m = createTimeoutManager();
 *   m.set(() => console.log('A'), 1000); m.clearAll();
 * Example Output:
 *   (no output)
 */
export function createTimeoutManager() {
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

/**
 * Problem: Publisher-Subscriber.
 * Example Input:
 *   const bus = new EventBus(); const off = bus.on('x', h); bus.emit('x'); off();
 * Example Output:
 *   handler runs only while subscribed
 */
export class EventBus {
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

/**
 * Problem: Publisher-Subscriber 2 with once().
 * Example Input:
 *   bus.once('ready', cb); bus.emit('ready'); bus.emit('ready');
 * Example Output:
 *   cb runs once
 */
export class EventBus2 extends EventBus {
  once(event, handler) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      handler(...args);
    };
    return this.on(event, wrapper);
  }
}

/**
 * Problem: Implement a router middleware chain.
 * Example Input:
 *   const app = createApp(); app.use(m1); app.use(m2); await app.run(req, res);
 * Example Output:
 *   middlewares execute in order
 */
export function createApp() {
  const middlewares = [];

  function use(fn) {
    middlewares.push(fn);
  }

  function run(req, res) {
    let idx = -1;

    function dispatch(i) {
      if (i <= idx) return Promise.reject(new Error('next() called multiple times'));
      idx = i;
      const fn = middlewares[i];
      if (!fn) return Promise.resolve(req);
      return Promise.resolve(fn(req, res, () => dispatch(i + 1)));
    }

    return dispatch(0);
  }

  return { use, run };
}

/**
 * Problem: Create an analytics SDK.
 * Example Input:
 *   const sdk = new AnalyticsSDK({ batchSize: 2, send: console.log });
 *   sdk.track('page_view', { path: '/' }); sdk.track('click', { id: 'buy' });
 * Example Output:
 *   batched events get flushed
 */
export class AnalyticsSDK {
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
    if (!this.queue.length) return;
    const batch = this.queue.splice(0, this.queue.length);
    this.send(batch);
  }
}

/**
 * Problem: Check performance of async and sync functions.
 * Example Input:
 *   benchmarkSync(fn), await benchmarkAsync(asyncFn)
 * Example Output:
 *   duration in milliseconds
 */
export function benchmarkSync(fn) {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

export async function benchmarkAsync(fn) {
  const start = performance.now();
  await fn();
  return performance.now() - start;
}
