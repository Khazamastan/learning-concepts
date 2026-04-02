import React from 'react';

export function WorkflowPanel({ data = {} }) {
  return (
    <section className="component workflow-panel">
      <header>
        <h2>WorkflowPanel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
