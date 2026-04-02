import React from 'react';

export function InvoiceTable({ data = {} }) {
  return (
    <section className="component invoice-table">
      <header>
        <h2>InvoiceTable</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
