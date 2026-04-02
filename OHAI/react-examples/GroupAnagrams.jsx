'use client';

import React, { useMemo, useState } from 'react';

function groupAnagrams(words) {
  const map = new Map();
  words.forEach((word) => {
    const signature = word.split('').sort().join('');
    if (!map.has(signature)) {
      map.set(signature, []);
    }
    map.get(signature).push(word);
  });
  return Array.from(map.values());
}

export function GroupAnagramsDemo() {
  const [input, setInput] = useState('eat, tea, tan, ate, nat, bat');

  const groups = useMemo(() => {
    const items = input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    return groupAnagrams(items);
  }, [input]);

  return (
    <section>
      <h2>Group Anagrams</h2>
      <label>
        Provide comma-separated words
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={4}
        />
      </label>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <strong>Group {index + 1}:</strong> {group.join(', ')}
          </li>
        ))}
      </ul>
    </section>
  );
}
