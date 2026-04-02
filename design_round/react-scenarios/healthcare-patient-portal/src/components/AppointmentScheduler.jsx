import React from 'react';

export function AppointmentScheduler({ data = {} }) {
  return (
    <section className="component appointment-scheduler">
      <header>
        <h2>AppointmentScheduler</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
