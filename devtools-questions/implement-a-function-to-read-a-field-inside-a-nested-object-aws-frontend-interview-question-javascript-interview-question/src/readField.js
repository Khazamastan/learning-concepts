export function readField(target, path, defaultValue = undefined) {
  if (target == null || typeof path !== 'string') {
    return defaultValue;
  }
  const segments = path.split('.').filter(Boolean);
  let ref = target;

  for (const segment of segments) {
    const next = ref?.[segment];
    if (next === undefined) {
      return defaultValue;
    }
    ref = next;
  }

  return ref;
}
