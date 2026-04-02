export function reducePolyfill(callback, initialValue) {
  if (this == null) {
    throw new TypeError('Cannot read properties of null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function');
  }

  const arr = Object(this);
  const length = arr.length >>> 0;
  let index = 0;
  let accumulator;

  if (arguments.length > 1) {
    accumulator = initialValue;
  } else {
    while (index < length && !(index in arr)) {
      index += 1;
    }
    if (index >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = arr[index];
    index += 1;
  }

  for (; index < length; index += 1) {
    if (index in arr) {
      accumulator = callback(accumulator, arr[index], index, arr);
    }
  }

  return accumulator;
}
