import React from 'react';

export function PlayByPlayFeed({ data = {} }) {
  return (
    <section className="component play-by-play-feed">
      <header>
        <h2>PlayByPlayFeed</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
