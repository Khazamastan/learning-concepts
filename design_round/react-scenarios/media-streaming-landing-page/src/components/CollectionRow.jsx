import React from 'react';

export function CollectionRow({ data = {} }) {
  return (
    <section className="component collection-row">
      <header>
        <h2>CollectionRow</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
