import React from 'react';

export function BillingShell({ data = {} }) {
  return (
    <section className="component billing-shell">
      <header>
        <h2>BillingShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
