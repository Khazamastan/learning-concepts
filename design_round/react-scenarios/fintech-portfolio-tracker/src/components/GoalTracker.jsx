import React from 'react';

export function GoalTracker({ data = {} }) {
  return (
    <section className="component goal-tracker">
      <header>
        <h2>GoalTracker</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
