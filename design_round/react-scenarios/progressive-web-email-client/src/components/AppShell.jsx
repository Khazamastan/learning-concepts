import React from 'react';

export function AppShell({ data = {} }) {
  return (
    <section className="component app-shell">
      <header>
        <h2>AppShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
