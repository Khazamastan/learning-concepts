import React from 'react';

export function DeviceTable({ data = {} }) {
  return (
    <section className="component device-table">
      <header>
        <h2>DeviceTable</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
