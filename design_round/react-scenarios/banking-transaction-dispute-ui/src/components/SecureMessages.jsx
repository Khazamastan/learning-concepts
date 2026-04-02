import React from 'react';

export function SecureMessages({ data = {} }) {
  return (
    <section className="component secure-messages">
      <header>
        <h2>SecureMessages</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
