import React from 'react';

export function FleetMap({ data = {} }) {
  return (
    <section className="component fleet-map">
      <header>
        <h2>FleetMap</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
