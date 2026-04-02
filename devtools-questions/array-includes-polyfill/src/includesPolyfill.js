export function includesPolyfill(searchElement, fromIndex = 0) {
  if (this == null) {
    throw new TypeError('Cannot read properties of null or undefined');
  }
  const arr = Object(this);
  const length = arr.length >>> 0;
  if (length === 0) {
    return false;
  }

  let start = Number(fromIndex) || 0;
  if (start < 0) {
    start = Math.max(length + start, 0);
  }

  for (let index = start; index < length; index += 1) {
    const value = arr[index];
    if (Object.is(value, searchElement)) {
      return true;
    }
  }
  return false;
}
