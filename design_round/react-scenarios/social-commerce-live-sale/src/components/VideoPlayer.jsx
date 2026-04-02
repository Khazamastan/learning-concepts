import React from 'react';

export function VideoPlayer({ data = {} }) {
  return (
    <section className="component video-player">
      <header>
        <h2>VideoPlayer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
