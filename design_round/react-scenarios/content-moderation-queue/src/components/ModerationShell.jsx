import React from 'react';

export function ModerationShell({ data = {} }) {
  return (
    <section className="component moderation-shell">
      <header>
        <h2>ModerationShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
