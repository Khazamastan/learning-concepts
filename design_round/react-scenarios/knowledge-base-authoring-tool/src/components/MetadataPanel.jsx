import React from 'react';

export function MetadataPanel({ data = {} }) {
  return (
    <section className="component metadata-panel">
      <header>
        <h2>MetadataPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
