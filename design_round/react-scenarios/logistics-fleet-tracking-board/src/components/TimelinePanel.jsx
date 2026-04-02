import React from 'react';

export function TimelinePanel({ data = {} }) {
  return (
    <section className="component timeline-panel">
      <header>
        <h2>TimelinePanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
