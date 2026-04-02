import React from 'react';

export function UsageChartPanel({ data = {} }) {
  return (
    <section className="component usage-chart-panel">
      <header>
        <h2>UsageChartPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
