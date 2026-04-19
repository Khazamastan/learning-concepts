/**
 * Problem: Memoize a function.
 * Example Input:
 *   const f = memoize((a,b)=>a+b); f(2,3); f(2,3)
 * Example Output:
 *   second call returns cached result
 */
export function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
}

/**
 * Problem: Polyfill for Array.filter.
 * Usage:
 *   installArrayFilterPolyfill();
 *   [1,2,3].myFilter(x => x > 1) // [2,3]
 */
export function installArrayFilterPolyfill() {
  if (!Array.prototype.myFilter) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.myFilter = function (callback, thisArg) {
      if (typeof callback !== 'function') throw new TypeError('callback must be function');
      const arr = Object(this);
      const out = [];
      for (let i = 0; i < arr.length; i += 1) {
        if (i in arr && callback.call(thisArg, arr[i], i, arr)) out.push(arr[i]);
      }
      return out;
    };
  }
}

/**
 * Problem: Polyfill for Array.map.
 * Usage:
 *   installArrayMapPolyfill();
 *   [1,2,3].myMap(x => x * x) // [1,4,9]
 */
export function installArrayMapPolyfill() {
  if (!Array.prototype.myMap) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.myMap = function (callback, thisArg) {
      if (typeof callback !== 'function') throw new TypeError('callback must be function');
      const arr = Object(this);
      const out = new Array(arr.length);
      for (let i = 0; i < arr.length; i += 1) {
        if (i in arr) out[i] = callback.call(thisArg, arr[i], i, arr);
      }
      return out;
    };
  }
}

/**
 * Problem: groupBy() polyfill.
 * Example Input:
 *   groupBy(users, u => u.role)
 * Example Output:
 *   { dev: [...], qa: [...] }
 */
export function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * Problem: Implement an Array iterator method.
 * Example Input:
 *   const it = arrayIterator([10,20]); it.next(); it.next(); it.next();
 * Example Output:
 *   {value:10,done:false}, {value:20,done:false}, {value:undefined,done:true}
 */
export function arrayIterator(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) return { value: arr[index++], done: false };
      return { value: undefined, done: true };
    }
  };
}

/**
 * Problem: Promise.all() polyfill.
 * Example Input:
 *   await promiseAll([Promise.resolve(1), Promise.resolve(2)])
 * Example Output:
 *   [1,2]
 */
export function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    const result = new Array(arr.length);
    let done = 0;

    if (arr.length === 0) {
      resolve([]);
      return;
    }

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then((val) => {
          result[i] = val;
          done += 1;
          if (done === arr.length) resolve(result);
        })
        .catch(reject);
    });
  });
}

/**
 * Problem: Promise.any() polyfill.
 * Example Input:
 *   await promiseAny([Promise.reject('A'), Promise.resolve('B')])
 * Example Output:
 *   B
 */
export function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    const errors = new Array(arr.length);
    let rejectedCount = 0;

    if (arr.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          rejectedCount += 1;
          if (rejectedCount === arr.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}

/**
 * Problem: Sum up async function return values in parallel and sequence.
 * Example Input:
 *   const fns = [async()=>10, async()=>20, async()=>30]
 * Example Output:
 *   sumParallel -> 60, sumSequence -> 60
 */
export async function sumParallel(fns) {
  const values = await Promise.all(fns.map((fn) => fn()));
  return values.reduce((a, b) => a + b, 0);
}

export async function sumSequence(fns) {
  let total = 0;
  for (const fn of fns) total += await fn();
  return total;
}
