export function popPolyfill() {
  const arr = this;
  if (arr.length === 0) {
    return undefined;
  }
  const lastIndex = arr.length - 1;
  const value = arr[lastIndex];
  delete arr[lastIndex];
  arr.length = lastIndex;
  return value;
}
