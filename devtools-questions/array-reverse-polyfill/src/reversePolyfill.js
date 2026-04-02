export function reversePolyfill() {
  const arr = this;
  const mid = Math.floor(arr.length / 2);
  for (let i = 0; i < mid; i += 1) {
    const opposite = arr.length - 1 - i;
    const temp = arr[i];
    arr[i] = arr[opposite];
    arr[opposite] = temp;
  }
  return arr;
}
