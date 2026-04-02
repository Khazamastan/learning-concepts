/**
 * Count occurrences in a collection using an iteratee function.
 * @template T
 * @param {T[]} collection
 * @param {(item: T) => string | number | symbol} iteratee
 * @returns {Record<string | number | symbol, number>}
 */
export function countBy(collection, iteratee) {
  if (typeof iteratee !== 'function') {
    throw new TypeError('iteratee must be a function');
  }

  return collection.reduce((acc, item) => {
    const key = iteratee(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}
