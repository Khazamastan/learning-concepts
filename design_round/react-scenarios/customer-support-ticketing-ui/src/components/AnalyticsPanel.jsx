import React from 'react';

export function AnalyticsPanel({ data = {} }) {
  return (
    <section className="component analytics-panel">
      <header>
        <h2>AnalyticsPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
