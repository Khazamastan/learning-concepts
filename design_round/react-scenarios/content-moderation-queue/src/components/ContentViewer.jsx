import React from 'react';

export function ContentViewer({ data = {} }) {
  return (
    <section className="component content-viewer">
      <header>
        <h2>ContentViewer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
