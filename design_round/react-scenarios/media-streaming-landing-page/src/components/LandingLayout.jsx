import React from 'react';

export function LandingLayout({ data = {} }) {
  return (
    <section className="component landing-layout">
      <header>
        <h2>LandingLayout</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
