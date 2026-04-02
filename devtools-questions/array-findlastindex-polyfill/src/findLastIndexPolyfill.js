export function findLastIndexPolyfill(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Cannot read properties of null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function');
  }

  const arr = Object(this);
  const length = arr.length >>> 0;

  for (let index = length - 1; index >= 0; index -= 1) {
    if (index in arr) {
      if (callback.call(thisArg, arr[index], index, arr)) {
        return index;
      }
    }
  }
  return -1;
}
