/**
 * Polyfill for Array.isArray following ECMA-262 specification.
 * @param {*} value
 * @returns {boolean}
 */
export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}
