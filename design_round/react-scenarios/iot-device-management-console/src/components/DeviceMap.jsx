import React from 'react';

export function DeviceMap({ data = {} }) {
  return (
    <section className="component device-map">
      <header>
        <h2>DeviceMap</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
