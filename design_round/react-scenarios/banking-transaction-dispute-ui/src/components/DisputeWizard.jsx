import React from 'react';

export function DisputeWizard({ data = {} }) {
  return (
    <section className="component dispute-wizard">
      <header>
        <h2>DisputeWizard</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
