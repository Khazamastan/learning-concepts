import React from 'react';

export function DiscussionPanel({ data = {} }) {
  return (
    <section className="component discussion-panel">
      <header>
        <h2>DiscussionPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
