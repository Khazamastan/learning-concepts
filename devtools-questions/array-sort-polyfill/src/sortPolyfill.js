export function sortPolyfill(compareFn) {
  const arr = this;
  const comparator = typeof compareFn === 'function' ? compareFn : (a, b) => String(a).localeCompare(String(b));
  const result = [...arr];
  for (let i = 1; i < result.length; i += 1) {
    let j = i;
    const value = result[i];
    while (j > 0 && comparator(result[j - 1], value) > 0) {
      result[j] = result[j - 1];
      j -= 1;
    }
    result[j] = value;
  }
  return result;
}
