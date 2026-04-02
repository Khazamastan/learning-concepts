export function setByPath(target, path, value) {
  const segments = Array.isArray(path) ? path : String(path).split('.');
  let ref = target;
  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      ref[segment] = value;
    } else {
      ref[segment] = ref[segment] ?? {};
      ref = ref[segment];
    }
  });
  return target;
}
