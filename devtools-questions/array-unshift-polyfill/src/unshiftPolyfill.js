export function unshiftPolyfill(...items) {
  const arr = this;
  const insertCount = items.length;
  const originalLength = arr.length >>> 0;

  if (insertCount === 0) {
    return originalLength;
  }

  for (let i = originalLength - 1; i >= 0; i -= 1) {
    arr[i + insertCount] = arr[i];
  }

  for (let j = 0; j < insertCount; j += 1) {
    arr[j] = items[j];
  }

  return (arr.length = originalLength + insertCount);
}
