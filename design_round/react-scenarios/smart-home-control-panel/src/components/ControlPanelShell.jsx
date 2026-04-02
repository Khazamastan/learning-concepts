import React from 'react';

export function ControlPanelShell({ data = {} }) {
  return (
    <section className="component control-panel-shell">
      <header>
        <h2>ControlPanelShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
