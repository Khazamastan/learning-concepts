'use client';

import React, { useMemo, useState } from 'react';

function myFilter(array, predicate) {
  const result = [];
  array.forEach((value, index) => {
    if (predicate(value, index, array)) {
      result.push(value);
    }
  });
  return result;
}

export function FilterPolyfillDemo() {
  const [threshold, setThreshold] = useState(3);
  const [values, setValues] = useState('1,2,3,4,5');

  const parsedValues = useMemo(
    () =>
      values
        .split(',')
        .map((item) => Number(item.trim()))
        .filter(Number.isFinite),
    [values],
  );

  const filteredWithNative = useMemo(
    () => parsedValues.filter((value) => value >= threshold),
    [parsedValues, threshold],
  );
  const filteredWithPolyfill = useMemo(
    () => myFilter(parsedValues, (value) => value >= threshold),
    [parsedValues, threshold],
  );

  return (
    <section>
      <h2>Filter Polyfill</h2>
      <label>
        Source values
        <input
          type="text"
          value={values}
          onChange={(event) => setValues(event.target.value)}
        />
      </label>
      <label>
        Threshold
        <input
          type="number"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value) || 0)}
        />
      </label>
      <p>
        Native filter result:
        {' '}
        <code>{JSON.stringify(filteredWithNative)}</code>
      </p>
      <p>
        Polyfill result:
        {' '}
        <code>{JSON.stringify(filteredWithPolyfill)}</code>
      </p>
    </section>
  );
}
