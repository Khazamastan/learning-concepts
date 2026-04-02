/**
 * Minimum number of shots required to cover every plane trajectory,
 * modeled as inclusive altitude intervals. Greedy interval stabbing.
 *
 * Example:
 * const planes = [
 *   [1, 6],
 *   [2, 8],
 *   [7, 12],
 *   [10, 16],
 * ];
 * console.log(minimumShotsForPlanes(planes)); // 2
 *
 * @param {Array<[number, number]>} planes
 * @returns {number}
 */
function minimumShotsForPlanes(planes) {
  if (!Array.isArray(planes) || planes.length === 0) {
    return 0;
  }

  const byEnd = [...planes].sort((a, b) => a[1] - b[1]);
  let shots = 0;
  let currentShotHeight = Number.NEGATIVE_INFINITY;

  for (const [start, end] of byEnd) {
    if (start > currentShotHeight) {
      shots += 1;
      currentShotHeight = end;
    }
  }

  return shots;
}

module.exports = { minimumShotsForPlanes };
