import React from 'react';

export function DocumentCenter({ data = {} }) {
  return (
    <section className="component document-center">
      <header>
        <h2>DocumentCenter</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
