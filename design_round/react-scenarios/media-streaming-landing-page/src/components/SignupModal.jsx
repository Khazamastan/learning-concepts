import React from 'react';

export function SignupModal({ data = {} }) {
  return (
    <section className="component signup-modal">
      <header>
        <h2>SignupModal</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
