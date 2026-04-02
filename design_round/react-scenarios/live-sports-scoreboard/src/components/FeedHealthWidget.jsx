import React from 'react';

export function FeedHealthWidget({ data = {} }) {
  return (
    <section className="component feed-health-widget">
      <header>
        <h2>FeedHealthWidget</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
