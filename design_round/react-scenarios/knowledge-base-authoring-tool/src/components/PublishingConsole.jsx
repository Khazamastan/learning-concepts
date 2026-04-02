import React from 'react';

export function PublishingConsole({ data = {} }) {
  return (
    <section className="component publishing-console">
      <header>
        <h2>PublishingConsole</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
