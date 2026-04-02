import React from 'react';

export function TaskDrawer({ data = {} }) {
  return (
    <section className="component task-drawer">
      <header>
        <h2>TaskDrawer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
