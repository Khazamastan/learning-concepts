/**
 * Problem #14: Implement an router middleware
 *
 * Detailed Problem Statement:
 * Simulate Express-like middleware chaining: each middleware gets `(req, res, next)`.
 *
 * Example Input:
 * const app = createApp();
 * app.use((req, res, next) => { req.count = 1; next(); });
 * app.use((req, res, next) => { req.count += 1; next(); });
 * app.run({}, {}).then((req) => console.log(req.count));
 *
 * Example Output:
 * 2
 */

export const problem = `Implement an router middleware`;

export const statement = `
Simulate Express-like middleware chaining: each middleware gets \`(req, res, next)\`.
`.trim();

export const exampleInput = `
const app = createApp();
app.use((req, res, next) => { req.count = 1; next(); });
app.use((req, res, next) => { req.count += 1; next(); });
app.run({}, {}).then((req) => console.log(req.count));
`.trim();

export const exampleOutput = `
2
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function createApp() {
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
