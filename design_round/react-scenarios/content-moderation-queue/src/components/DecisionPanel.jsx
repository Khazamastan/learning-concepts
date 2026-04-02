import React from 'react';

export function DecisionPanel({ data = {} }) {
  return (
    <section className="component decision-panel">
      <header>
        <h2>DecisionPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
