export function memoize(fn, keyResolver = (...args) => JSON.stringify(args)) {
  if (typeof fn !== "function") {
    throw new TypeError("memoize expects a function");
  }
  const cache = new Map();
  return function memoized(...args) {
    const key = keyResolver(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

const fastFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.time("slow");
console.log(slowFib(20));
console.timeEnd("slow");

console.time("fast");
console.log(fastFib(20));
console.timeEnd("fast");
