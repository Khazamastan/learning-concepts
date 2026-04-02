export function promisify(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("promisify expects a function");
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}
