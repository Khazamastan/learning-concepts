import React from 'react';

export function ScoreboardLayout({ data = {} }) {
  return (
    <section className="component scoreboard-layout">
      <header>
        <h2>ScoreboardLayout</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
