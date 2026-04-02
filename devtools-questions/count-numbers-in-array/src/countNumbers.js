/**
 * Count the number of occurrences for each numeric value.
 * @param {(number|string)[]} values
 * @returns {Record<string, number>}
 */
export function countNumbers(values) {
  return values.reduce((acc, value) => {
    const key = Number(value);
    if (!Number.isNaN(key)) {
      const normalized = String(key);
      acc[normalized] = (acc[normalized] ?? 0) + 1;
    }
    return acc;
  }, {});
}
