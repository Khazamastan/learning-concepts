import React from 'react';

export function MapPanel({ data = {} }) {
  return (
    <section className="component map-panel">
      <header>
        <h2>MapPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
