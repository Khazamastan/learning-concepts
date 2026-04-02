import React from 'react';

export function DisputeShell({ data = {} }) {
  return (
    <section className="component dispute-shell">
      <header>
        <h2>DisputeShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
