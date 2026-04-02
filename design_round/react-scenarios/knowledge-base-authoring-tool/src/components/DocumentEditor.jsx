import React from 'react';

export function DocumentEditor({ data = {} }) {
  return (
    <section className="component document-editor">
      <header>
        <h2>DocumentEditor</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
