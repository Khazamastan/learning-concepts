import React from 'react';

export function EditorPane({ data = {} }) {
  return (
    <section className="component editor-pane">
      <header>
        <h2>EditorPane</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
