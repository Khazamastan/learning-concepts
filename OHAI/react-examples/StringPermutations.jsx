'use client';

import React, { useMemo, useState } from 'react';

function stringPermutations(input) {
  const chars = input.split('').sort();
  const used = Array(chars.length).fill(false);
  const result = [];

  function backtrack(path) {
    if (path.length === chars.length) {
      result.push(path.join(''));
      return;
    }

    for (let index = 0; index < chars.length; index += 1) {
      if (used[index]) {
        continue;
      }
      if (index > 0 && chars[index] === chars[index - 1] && !used[index - 1]) {
        continue;
      }
      used[index] = true;
      path.push(chars[index]);
      backtrack(path);
      path.pop();
      used[index] = false;
    }
  }

  backtrack([]);
  return result;
}

export function StringPermutationsDemo() {
  const [input, setInput] = useState('aab');

  const permutations = useMemo(() => stringPermutations(input), [input]);

  return (
    <section>
      <h2>String Permutations</h2>
      <label>
        Input
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      </label>
      <p>Permutations ({permutations.length}):</p>
      <ul>
        {permutations.map((permutation) => (
          <li key={permutation}>{permutation}</li>
        ))}
      </ul>
    </section>
  );
}
