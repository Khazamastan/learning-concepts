import React from 'react';

export function AlertCenter({ data = {} }) {
  return (
    <section className="component alert-center">
      <header>
        <h2>AlertCenter</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
