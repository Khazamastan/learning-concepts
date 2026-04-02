import React from 'react';

export function SceneBuilder({ data = {} }) {
  return (
    <section className="component scene-builder">
      <header>
        <h2>SceneBuilder</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
