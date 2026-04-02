import React from 'react';

export function QueueList({ data = {} }) {
  return (
    <section className="component queue-list">
      <header>
        <h2>QueueList</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
