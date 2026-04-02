import React from 'react';

export function NotificationCenter({ data = {} }) {
  return (
    <section className="component notification-center">
      <header>
        <h2>NotificationCenter</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
