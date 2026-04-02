import React from 'react';

export function VehicleDrawer({ data = {} }) {
  return (
    <section className="component vehicle-drawer">
      <header>
        <h2>VehicleDrawer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
