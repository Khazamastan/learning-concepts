import React from 'react';

export function WorkflowBuilder({ data = {} }) {
  return (
    <section className="component workflow-builder">
      <header>
        <h2>WorkflowBuilder</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
