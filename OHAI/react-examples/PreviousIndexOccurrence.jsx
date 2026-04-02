'use client';

import React, { useMemo, useState } from 'react';

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
    const positionList = positionsInPrimary.get(value) || [];
    const previousIndexInPrimary = positionList.length ? positionList.shift() : null;
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

function parseNumberArray(input) {
  return input
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => Number(item))
    .filter((item) => !Number.isNaN(item));
}

export function PreviousIndexOccurrenceDemo() {
  const [primaryInput, setPrimaryInput] = useState('4,7,4,9,7');
  const [secondaryInput, setSecondaryInput] = useState('7,4,7,4,9');

  const results = useMemo(() => {
    const primary = parseNumberArray(primaryInput);
    const secondary = parseNumberArray(secondaryInput);
    return previousIndexOccurrence(primary, secondary);
  }, [primaryInput, secondaryInput]);

  return (
    <section>
      <h2>Previous Index Occurrence</h2>
      <label>
        Primary array
        <input
          type="text"
          value={primaryInput}
          onChange={(event) => setPrimaryInput(event.target.value)}
        />
      </label>
      <label>
        Secondary array
        <input
          type="text"
          value={secondaryInput}
          onChange={(event) => setSecondaryInput(event.target.value)}
        />
      </label>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </section>
  );
}
