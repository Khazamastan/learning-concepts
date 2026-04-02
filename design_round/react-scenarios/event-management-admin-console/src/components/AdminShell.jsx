import React from 'react';

export function AdminShell({ data = {} }) {
  return (
    <section className="component admin-shell">
      <header>
        <h2>AdminShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
