import React from 'react';

export function SearchForm({ data = {} }) {
  return (
    <section className="component search-form">
      <header>
        <h2>SearchForm</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
