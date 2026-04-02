'use client';

import React, { useMemo, useState } from 'react';

function lengthOfLongestSubstring(input) {
  const lastSeen = new Map();
  let windowStart = 0;
  let maxLength = 0;
  let bestSubstring = '';

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (lastSeen.has(char) && lastSeen.get(char) >= windowStart) {
      windowStart = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, index);
    const windowLength = index - windowStart + 1;
    if (windowLength > maxLength) {
      maxLength = windowLength;
      bestSubstring = input.slice(windowStart, index + 1);
    }
  }

  return { length: maxLength, substring: bestSubstring };
}

export function LongestSubstringNoRepeatDemo() {
  const [input, setInput] = useState('pwwkew');

  const result = useMemo(() => lengthOfLongestSubstring(input), [input]);

  return (
    <section>
      <h2>Longest Substring Without Repeating Characters</h2>
      <label>
        Input
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      </label>
      <p>Length: {result.length}</p>
      <p>Substring: <code>{result.substring}</code></p>
    </section>
  );
}
