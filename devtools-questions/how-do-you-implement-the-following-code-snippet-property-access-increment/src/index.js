export function incrementPath(target, path, step = 1) {
  if (typeof target !== "object" || target === null) {
    throw new TypeError("target must be an object");
  }
  const segments = path.split(".");
  let cursor = target;
  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    if (!(segment in cursor)) {
      cursor[segment] = {};
    }
    cursor = cursor[segment];
    if (typeof cursor !== "object" || cursor === null) {
      throw new TypeError(`Cannot set property on non-object segment: ${segment}`);
    }
  }
  const last = segments[segments.length - 1];
  const currentValue = Number(cursor[last] ?? 0);
  const next = currentValue + step;
  cursor[last] = next;
  return next;
}

const stats = { user: { visits: 3 } };
incrementPath(stats, "user.visits");
incrementPath(stats, "user.visits", 4);
incrementPath(stats, "user.likes", 2);
console.log(stats);
