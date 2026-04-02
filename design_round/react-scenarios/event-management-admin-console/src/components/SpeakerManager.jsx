import React from 'react';

export function SpeakerManager({ data = {} }) {
  return (
    <section className="component speaker-manager">
      <header>
        <h2>SpeakerManager</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
