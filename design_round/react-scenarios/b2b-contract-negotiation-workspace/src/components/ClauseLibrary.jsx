import React from 'react';

export function ClauseLibrary({ data = {} }) {
  return (
    <section className="component clause-library">
      <header>
        <h2>ClauseLibrary</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
