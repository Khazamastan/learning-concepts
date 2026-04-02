import React from 'react';

export function OverlayManager({ data = {} }) {
  return (
    <section className="component overlay-manager">
      <header>
        <h2>OverlayManager</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
