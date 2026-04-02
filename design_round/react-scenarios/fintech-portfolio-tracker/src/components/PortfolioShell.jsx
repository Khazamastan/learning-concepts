import React from 'react';

export function PortfolioShell({ data = {} }) {
  return (
    <section className="component portfolio-shell">
      <header>
        <h2>PortfolioShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
