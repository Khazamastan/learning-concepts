import React from 'react';

export function FeatureHighlights({ data = {} }) {
  return (
    <section className="component feature-highlights">
      <header>
        <h2>FeatureHighlights</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
