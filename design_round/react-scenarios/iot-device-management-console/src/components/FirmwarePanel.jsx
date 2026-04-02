import React from 'react';

export function FirmwarePanel({ data = {} }) {
  return (
    <section className="component firmware-panel">
      <header>
        <h2>FirmwarePanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
