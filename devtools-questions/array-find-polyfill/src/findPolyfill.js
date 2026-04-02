export function findPolyfill(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Cannot read properties of null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function');
  }

  const arr = Object(this);
  const length = arr.length >>> 0;

  for (let index = 0; index < length; index += 1) {
    if (index in arr) {
      const value = arr[index];
      if (callback.call(thisArg, value, index, arr)) {
        return value;
      }
    }
  }
  return undefined;
}
