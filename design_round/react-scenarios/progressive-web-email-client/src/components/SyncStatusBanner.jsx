import React from 'react';

export function SyncStatusBanner({ data = {} }) {
  return (
    <section className="component sync-status-banner">
      <header>
        <h2>SyncStatusBanner</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
