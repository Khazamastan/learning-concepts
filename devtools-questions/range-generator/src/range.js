export function range(start, end, step = 1) {
  if (step === 0) {
    throw new Error('Step cannot be 0');
  }
  const result = [];
  const increasing = step > 0;
  if (increasing) {
    for (let value = start; value < end; value += step) {
      result.push(value);
    }
  } else {
    for (let value = start; value > end; value += step) {
      result.push(value);
    }
  }
  return result;
}
