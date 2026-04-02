/**
 * Minimum number of platforms required so no train waits.
 * Equivalent to maximum overlap of arrival/departure intervals.
 *
 * @param {number[]} arrivals - minutes from midnight
 * @param {number[]} departures - minutes from midnight (same order as arrivals)
 * @returns {number}
 */
function minPlatformsNeeded(arrivals, departures) {
  if (!Array.isArray(arrivals) || !Array.isArray(departures)) {
    throw new Error("arrivals and departures must be arrays");
  }
  if (arrivals.length !== departures.length) {
    throw new Error("arrivals and departures must have the same length");
  }
  if (arrivals.length === 0) {
    return 0;
  }

  const a = [...arrivals].sort((x, y) => x - y);
  const d = [...departures].sort((x, y) => x - y);

  let platforms = 0;
  let maxPlatforms = 0;
  let i = 0;
  let j = 0;

  while (i < a.length && j < d.length) {
    if (a[i] <= d[j]) {
      platforms += 1;
      maxPlatforms = Math.max(maxPlatforms, platforms);
      i += 1;
    } else {
      platforms -= 1;
      j += 1;
    }
  }

  return maxPlatforms;
}

module.exports = { minPlatformsNeeded };
