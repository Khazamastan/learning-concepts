export function fillPolyfill(value, start = 0, end = this.length) {
  const arr = this;
  const len = arr.length >>> 0;
  let k = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const final = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
  while (k < final) {
    arr[k] = value;
    k += 1;
  }
  return arr;
}
