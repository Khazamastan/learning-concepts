import React from 'react';

export function WorkspaceShell({ data = {} }) {
  return (
    <section className="component workspace-shell">
      <header>
        <h2>WorkspaceShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
