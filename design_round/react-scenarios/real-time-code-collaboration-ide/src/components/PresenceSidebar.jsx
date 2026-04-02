import React from 'react';

export function PresenceSidebar({ data = {} }) {
  return (
    <section className="component presence-sidebar">
      <header>
        <h2>PresenceSidebar</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
