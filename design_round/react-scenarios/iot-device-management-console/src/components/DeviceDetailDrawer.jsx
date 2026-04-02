import React from 'react';

export function DeviceDetailDrawer({ data = {} }) {
  return (
    <section className="component device-detail-drawer">
      <header>
        <h2>DeviceDetailDrawer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
