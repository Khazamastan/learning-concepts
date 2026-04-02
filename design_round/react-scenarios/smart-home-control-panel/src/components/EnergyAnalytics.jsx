import React from 'react';

export function EnergyAnalytics({ data = {} }) {
  return (
    <section className="component energy-analytics">
      <header>
        <h2>EnergyAnalytics</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
