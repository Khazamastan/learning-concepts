import React from 'react';

export function FleetShell({ data = {} }) {
  return (
    <section className="component fleet-shell">
      <header>
        <h2>FleetShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
