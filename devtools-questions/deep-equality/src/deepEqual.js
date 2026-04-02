export function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) {
    return true;
  }

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }

  if (seen.has(a)) {
    return seen.get(a) === b;
  }
  seen.set(a, b);

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => keysB.includes(key) && deepEqual(a[key], b[key], seen));
}
