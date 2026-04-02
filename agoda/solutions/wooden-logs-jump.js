/**
 * Count distinct ways to reach the nth log when you can jump 1, 2, or 3 logs.
 * Bottom-up dynamic programming with constant extra space.
 *
 * Example:
 * console.log(countLogJumps(5)); // 13
 *
 * @param {number} n
 * @returns {number}
 */
function countLogJumps(n) {
  if (typeof n !== "number" || n < 0) {
    throw new Error("n must be a non-negative integer");
  }
  if (n <= 1) {
    return 1;
  }

  let one = 1; // ways to reach i - 1
  let two = 1; // ways to reach i - 2
  let three = 0; // ways to reach i - 3

  for (let i = 2; i <= n; i += 1) {
    const current = one + two + three;
    three = two;
    two = one;
    one = current;
  }

  return one;
}

module.exports = { countLogJumps };
