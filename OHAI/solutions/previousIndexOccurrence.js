'use strict';

function previousIndexOccurrence(primary, secondary) {
  const positionsInPrimary = new Map();
  primary.forEach((value, index) => {
    if (!positionsInPrimary.has(value)) {
      positionsInPrimary.set(value, []);
    }
    positionsInPrimary.get(value).push(index);
  });

  const lastSeenInSecondary = new Map();
  const results = [];

  secondary.forEach((value, indexInSecondary) => {
    const primaryPositions = positionsInPrimary.get(value) || [];
    const previousIndexInPrimary = primaryPositions.length ? primaryPositions.shift() : null;
    const previousIndexInSecondary = lastSeenInSecondary.has(value)
      ? lastSeenInSecondary.get(value)
      : null;

    results.push({
      value,
      indexInSecondary,
      previousIndexInPrimary,
      previousIndexInSecondary,
      distanceBetweenArrays:
        previousIndexInPrimary === null ? null : Math.abs(previousIndexInPrimary - indexInSecondary),
      distanceWithinSecondary:
        previousIndexInSecondary === null ? null : indexInSecondary - previousIndexInSecondary,
    });

    lastSeenInSecondary.set(value, indexInSecondary);
  });

  return results;
}

const primary = [4, 7, 4, 9, 7];
const secondary = [7, 4, 7, 4, 9];

console.log(previousIndexOccurrence(primary, secondary));

module.exports = { previousIndexOccurrence };
