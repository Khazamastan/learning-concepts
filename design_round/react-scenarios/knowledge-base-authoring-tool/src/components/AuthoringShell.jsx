import React from 'react';

export function AuthoringShell({ data = {} }) {
  return (
    <section className="component authoring-shell">
      <header>
        <h2>AuthoringShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
