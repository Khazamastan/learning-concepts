import React from 'react';

export function SecureMessenger({ data = {} }) {
  return (
    <section className="component secure-messenger">
      <header>
        <h2>SecureMessenger</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
