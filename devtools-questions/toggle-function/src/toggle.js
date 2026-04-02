export function toggle(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Values must be a non-empty array');
  }
  let index = 0;
  return () => {
    const current = values[index];
    index = (index + 1) % values.length;
    return current;
  };
}
