import React from 'react';

export function SearchShell({ data = {} }) {
  return (
    <section className="component search-shell">
      <header>
        <h2>SearchShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
