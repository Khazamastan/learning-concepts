import React from 'react';

export function GameCard({ data = {} }) {
  return (
    <section className="component game-card">
      <header>
        <h2>GameCard</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
