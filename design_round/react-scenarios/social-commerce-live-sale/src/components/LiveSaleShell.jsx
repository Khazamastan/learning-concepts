import React from 'react';

export function LiveSaleShell({ data = {} }) {
  return (
    <section className="component live-sale-shell">
      <header>
        <h2>LiveSaleShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
