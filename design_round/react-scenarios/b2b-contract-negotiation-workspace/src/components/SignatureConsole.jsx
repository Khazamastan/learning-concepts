import React from 'react';

export function SignatureConsole({ data = {} }) {
  return (
    <section className="component signature-console">
      <header>
        <h2>SignatureConsole</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
