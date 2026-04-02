import React from 'react';

export function CaseTimeline({ data = {} }) {
  return (
    <section className="component case-timeline">
      <header>
        <h2>CaseTimeline</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
