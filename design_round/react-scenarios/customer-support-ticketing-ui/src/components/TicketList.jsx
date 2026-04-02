import React from 'react';

export function TicketList({ data = {} }) {
  return (
    <section className="component ticket-list">
      <header>
        <h2>TicketList</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
