import React from 'react';

export function ReviewSidebar({ data = {} }) {
  return (
    <section className="component review-sidebar">
      <header>
        <h2>ReviewSidebar</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
