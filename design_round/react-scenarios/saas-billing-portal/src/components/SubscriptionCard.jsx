import React from 'react';

export function SubscriptionCard({ data = {} }) {
  return (
    <section className="component subscription-card">
      <header>
        <h2>SubscriptionCard</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
