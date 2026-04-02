/**
 * Create a chainable adder function.
 * @param {number} initial
 * @returns {Function}
 */
export function add(initial = 0) {
  let total = Number(initial) || 0;

  const accumulator = (value = 0) => {
    total += Number(value) || 0;
    return accumulator;
  };

  accumulator.valueOf = () => total;
  accumulator.toString = () => String(total);

  return accumulator;
}
