import React from 'react';

export function NegotiationShell({ data = {} }) {
  return (
    <section className="component negotiation-shell">
      <header>
        <h2>NegotiationShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
