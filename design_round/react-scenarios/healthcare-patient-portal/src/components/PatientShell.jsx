import React from 'react';

export function PatientShell({ data = {} }) {
  return (
    <section className="component patient-shell">
      <header>
        <h2>PatientShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
