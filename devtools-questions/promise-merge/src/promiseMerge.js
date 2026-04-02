/**
 * Merge an object of promises into a single promise resolved with an object of results.
 * @param {Record<string, any>} shape
 * @returns {Promise<Record<string, any>>}
 */
export function promiseMerge(shape) {
  const entries = Object.entries(shape);
  return Promise.all(
    entries.map(([key, value]) =>
      Promise.resolve(value).then((resolved) => ({ key, resolved }))
    )
  ).then((items) =>
    items.reduce((acc, { key, resolved }) => {
      acc[key] = resolved;
      return acc;
    }, {})
  );
}
