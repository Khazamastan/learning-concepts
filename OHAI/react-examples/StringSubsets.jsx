'use client';

import React, { useMemo, useState } from 'react';

function stringSubsets(input) {
  const chars = input.split('');
  const totalMasks = 1 << chars.length;
  const subsets = [];

  for (let mask = 0; mask < totalMasks; mask += 1) {
    let subset = '';
    for (let index = 0; index < chars.length; index += 1) {
      if (mask & (1 << index)) {
        subset += chars[index];
      }
    }
    subsets.push(subset);
  }
  return subsets;
}

export function StringSubsetsDemo() {
  const [input, setInput] = useState('abc');

  const subsets = useMemo(() => stringSubsets(input), [input]);

  return (
    <section>
      <h2>String Subsets</h2>
      <label>
        Input
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      </label>
      <p>Total subsets: {subsets.length}</p>
      <ul>
        {subsets.map((subset, index) => (
          <li key={`${subset}-${index}`}>{subset || '(empty)'}</li>
        ))}
      </ul>
    </section>
  );
}
