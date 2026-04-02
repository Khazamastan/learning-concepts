import React from 'react';

export function NotificationDrawer({ data = {} }) {
  return (
    <section className="component notification-drawer">
      <header>
        <h2>NotificationDrawer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
