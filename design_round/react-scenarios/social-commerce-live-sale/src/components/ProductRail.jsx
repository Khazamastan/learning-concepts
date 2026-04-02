import React from 'react';

export function ProductRail({ data = {} }) {
  return (
    <section className="component product-rail">
      <header>
        <h2>ProductRail</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
