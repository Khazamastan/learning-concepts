/**
 * Problem: Create a Sampling function.
 * Example Input:
 *   const sampled = sample(console.log, 1000);
 *   sampled(1); sampled(2); sampled(3);
 * Example Output:
 *   (after ~1s) 3
 */
export function sample(fn, wait) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;

  return function (...args) {
    lastArgs = args;
    lastThis = this;

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(lastThis, lastArgs);
        timer = null;
        lastArgs = null;
        lastThis = null;
      }, wait);
    }
  };
}

/**
 * Problem: Create a toggle function.
 * Example Input:
 *   const t = toggle('ON', 'OFF');
 *   t(); t(); t();
 * Example Output:
 *   ON, OFF, ON
 */
export function toggle(...values) {
  let i = 0;
  return function () {
    const out = values[i % values.length];
    i += 1;
    return out;
  };
}

/**
 * Problem: Flatten an Array.
 * Example Input:
 *   flattenArray([1, [2, [3]], 4])
 * Example Output:
 *   [1, 2, 3, 4]
 */
export function flattenArray(arr) {
  const out = [];

  function dfs(node) {
    for (const item of node) {
      if (Array.isArray(item)) dfs(item);
      else out.push(item);
    }
  }

  dfs(arr);
  return out;
}

/**
 * Problem: Piping-1 (left-to-right composition).
 * Example Input:
 *   pipe(x => x + 2, x => x * x)(3)
 * Example Output:
 *   25
 */
export function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

/**
 * Problem: Piping-2 (first function can take multiple args).
 * Example Input:
 *   pipe2((a, b) => a + b, x => x * x)(2, 3)
 * Example Output:
 *   25
 */
export function pipe2(...fns) {
  return function (...args) {
    if (fns.length === 0) return args[0];
    const first = fns[0](...args);
    return fns.slice(1).reduce((acc, fn) => fn(acc), first);
  };
}

/**
 * Problem: Currying.
 * Example Input:
 *   const curried = curry((a, b, c) => a + b + c);
 *   curried(1)(2)(3)
 * Example Output:
 *   6
 */
export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}

/**
 * Problem: Method chaining.
 * Example Input:
 *   new Calculator(10).add(5).sub(3).mul(2).value()
 * Example Output:
 *   24
 */
export class Calculator {
  constructor(initial = 0) {
    this.total = initial;
  }

  add(n) {
    this.total += n;
    return this;
  }

  sub(n) {
    this.total -= n;
    return this;
  }

  mul(n) {
    this.total *= n;
    return this;
  }

  value() {
    return this.total;
  }
}
