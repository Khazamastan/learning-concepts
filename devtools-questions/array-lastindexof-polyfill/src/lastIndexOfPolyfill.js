export function lastIndexOfPolyfill(searchElement, fromIndex) {
  if (this == null) {
    throw new TypeError('Cannot read properties of null or undefined');
  }

  const arr = Object(this);
  const length = arr.length >>> 0;
  if (length === 0) {
    return -1;
  }

  let index = fromIndex !== undefined ? Number(fromIndex) : length - 1;
  if (Number.isNaN(index)) {
    index = length - 1;
  } else if (index < 0) {
    index = length + index;
  }

  for (let i = Math.min(index, length - 1); i >= 0; i -= 1) {
    if (i in arr && arr[i] === searchElement) {
      return i;
    }
  }
  return -1;
}
