'use client';

import React, { useMemo, useState } from 'react';

function analyzeNim(piles) {
  const nimSum = piles.reduce((acc, pile) => acc ^ pile, 0);
  return { nimSum, winningPosition: nimSum !== 0 };
}

export function NimSumDemo() {
  const [input, setInput] = useState('3,4,5');

  const { nimSum, winningPosition } = useMemo(() => {
    const piles = input
      .split(',')
      .map((item) => Number(item.trim()))
      .filter(Number.isFinite);
    return analyzeNim(piles);
  }, [input]);

  return (
    <section>
      <h2>Nim Sum</h2>
      <label>
        Pile sizes
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      </label>
      <p>Nim sum: {nimSum}</p>
      <p>{winningPosition ? 'First player can force a win.' : 'Second player has the advantage.'}</p>
    </section>
  );
}
