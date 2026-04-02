import React from 'react';

export function ChatPanel({ data = {} }) {
  return (
    <section className="component chat-panel">
      <header>
        <h2>ChatPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
