export function pick(source, paths) {
  if (source == null) {
    return {};
  }
  const result = {};
  paths.forEach((rawPath) => {
    if (typeof rawPath !== 'string' || rawPath.length === 0) {
      return;
    }
    const segments = rawPath.split('.');
    let ref = source;
    for (let i = 0; i < segments.length; i += 1) {
      const key = segments[i];
      if (ref != null && Object.prototype.hasOwnProperty.call(ref, key)) {
        ref = ref[key];
      } else {
        ref = undefined;
        break;
      }
    }
    if (ref !== undefined) {
      let cursor = result;
      segments.forEach((segment, index) => {
        if (index === segments.length - 1) {
          cursor[segment] = ref;
        } else {
          cursor[segment] = cursor[segment] ?? {};
          cursor = cursor[segment];
        }
      });
    }
  });
  return result;
}
