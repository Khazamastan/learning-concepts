import React from 'react';

export function TimelineView({ data = {} }) {
  return (
    <section className="component timeline-view">
      <header>
        <h2>TimelineView</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
