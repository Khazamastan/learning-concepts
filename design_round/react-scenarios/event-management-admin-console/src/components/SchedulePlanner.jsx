import React from 'react';

export function SchedulePlanner({ data = {} }) {
  return (
    <section className="component schedule-planner">
      <header>
        <h2>SchedulePlanner</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
