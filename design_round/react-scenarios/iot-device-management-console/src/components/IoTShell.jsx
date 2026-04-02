import React from 'react';

export function IoTShell({ data = {} }) {
  return (
    <section className="component io-t-shell">
      <header>
        <h2>IoTShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
