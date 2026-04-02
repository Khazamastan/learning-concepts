import React from 'react';

export function ResultsPane({ data = {} }) {
  return (
    <section className="component results-pane">
      <header>
        <h2>ResultsPane</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
