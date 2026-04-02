export function shiftPolyfill() {
  const arr = this;
  if (arr.length === 0) {
    return undefined;
  }
  const first = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    arr[i - 1] = arr[i];
  }
  arr.length -= 1;
  return first;
}
