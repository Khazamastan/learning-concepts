import React from 'react';

export function ThreadList({ data = {} }) {
  return (
    <section className="component thread-list">
      <header>
        <h2>ThreadList</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
