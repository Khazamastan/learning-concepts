import React from 'react';

export function DeploymentPanel({ data = {} }) {
  return (
    <section className="component deployment-panel">
      <header>
        <h2>DeploymentPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
