export function atPolyfill(index) {
  if (this == null) {
    throw new TypeError('Cannot read properties of null or undefined');
  }

  const arr = Object(this);
  const length = arr.length >>> 0;
  if (length === 0) {
    return undefined;
  }

  let relativeIndex = Number(index);
  if (Number.isNaN(relativeIndex)) {
    relativeIndex = 0;
  }

  if (relativeIndex < 0) {
    relativeIndex = length + relativeIndex;
  }

  if (relativeIndex < 0 || relativeIndex >= length) {
    return undefined;
  }

  return arr[relativeIndex];
}
