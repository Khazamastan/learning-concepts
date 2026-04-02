import React from 'react';

export function AttendeeDashboard({ data = {} }) {
  return (
    <section className="component attendee-dashboard">
      <header>
        <h2>AttendeeDashboard</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
