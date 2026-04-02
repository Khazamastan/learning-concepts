export function stringRepeat(str, count) {
  if (count < 0) {
    throw new RangeError('Count must be non-negative');
  }
  let result = '';
  let pattern = String(str);
  let n = Math.floor(count);
  while (n > 0) {
    if (n % 2 === 1) {
      result += pattern;
    }
    n = Math.floor(n / 2);
    if (n > 0) {
      pattern += pattern;
    }
  }
  return result;
}
