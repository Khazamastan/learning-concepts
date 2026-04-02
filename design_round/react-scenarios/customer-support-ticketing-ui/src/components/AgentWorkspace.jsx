import React from 'react';

export function AgentWorkspace({ data = {} }) {
  return (
    <section className="component agent-workspace">
      <header>
        <h2>AgentWorkspace</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
