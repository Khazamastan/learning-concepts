import React from 'react';

export function MetricsSidebar({ data = {} }) {
  return (
    <section className="component metrics-sidebar">
      <header>
        <h2>MetricsSidebar</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
