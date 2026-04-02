import React from 'react';

export function MessageViewer({ data = {} }) {
  return (
    <section className="component message-viewer">
      <header>
        <h2>MessageViewer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
