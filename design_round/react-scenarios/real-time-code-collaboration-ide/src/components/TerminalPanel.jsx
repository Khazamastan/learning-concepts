import React from 'react';

export function TerminalPanel({ data = {} }) {
  return (
    <section className="component terminal-panel">
      <header>
        <h2>TerminalPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
