import React from 'react';

export function DeviceGrid({ data = {} }) {
  return (
    <section className="component device-grid">
      <header>
        <h2>DeviceGrid</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
