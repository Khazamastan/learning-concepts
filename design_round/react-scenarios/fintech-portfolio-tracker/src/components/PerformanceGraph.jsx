import React from 'react';

export function PerformanceGraph({ data = {} }) {
  return (
    <section className="component performance-graph">
      <header>
        <h2>PerformanceGraph</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
