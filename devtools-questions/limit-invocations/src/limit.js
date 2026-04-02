export function limit(fn, times) {
  let remaining = times;
  return (...args) => {
    if (remaining > 0) {
      remaining -= 1;
      return fn(...args);
    }
    return undefined;
  };
}
