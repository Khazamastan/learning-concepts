/**
 * Return number of expected positional parameters for a function.
 * @param {Function} fn
 * @returns {number}
 */
export function countFunctionParameters(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  return fn.length;
}
