/**
 * Polyfill for Array.prototype.filter
 * @param {Array} array
 * @param {(value: any, index: number, array: any[]) => boolean} predicate
 * @param {*} [thisArg]
 * @returns {Array}
 */
export function filter(array, predicate, thisArg) {
  if (array == null) {
    throw new TypeError('Cannot read properties of null or undefined.');
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('Predicate must be a function.');
  }

  const result = [];
  const obj = Object(array);
  const length = obj.length >>> 0;

  for (let index = 0; index < length; index += 1) {
    if (index in obj) {
      const value = obj[index];
      if (predicate.call(thisArg, value, index, obj)) {
        result.push(value);
      }
    }
  }

  return result;
}
