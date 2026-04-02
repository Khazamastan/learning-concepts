import React from 'react';

export function ComposeDrawer({ data = {} }) {
  return (
    <section className="component compose-drawer">
      <header>
        <h2>ComposeDrawer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
