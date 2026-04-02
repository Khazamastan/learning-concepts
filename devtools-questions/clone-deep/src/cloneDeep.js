export function cloneDeep(value, cache = new WeakMap()) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  if (cache.has(value)) {
    return cache.get(value);
  }

  const result = Array.isArray(value) ? [] : {};
  cache.set(value, result);

  Object.keys(value).forEach((key) => {
    result[key] = cloneDeep(value[key], cache);
  });

  return result;
}
