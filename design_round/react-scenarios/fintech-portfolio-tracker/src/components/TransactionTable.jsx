import React from 'react';

export function TransactionTable({ data = {} }) {
  return (
    <section className="component transaction-table">
      <header>
        <h2>TransactionTable</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
