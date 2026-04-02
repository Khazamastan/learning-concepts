import React from 'react';

export function DocumentViewer({ data = {} }) {
  return (
    <section className="component document-viewer">
      <header>
        <h2>DocumentViewer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
