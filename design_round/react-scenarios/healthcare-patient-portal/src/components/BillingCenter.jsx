import React from 'react';

export function BillingCenter({ data = {} }) {
  return (
    <section className="component billing-center">
      <header>
        <h2>BillingCenter</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
