import React from 'react';

export function TicketDetail({ data = {} }) {
  return (
    <section className="component ticket-detail">
      <header>
        <h2>TicketDetail</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
