import React from 'react';

export function AuditLogDrawer({ data = {} }) {
  return (
    <section className="component audit-log-drawer">
      <header>
        <h2>AuditLogDrawer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
