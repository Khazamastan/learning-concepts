import React from 'react';

export function AssetAllocationChart({ data = {} }) {
  return (
    <section className="component asset-allocation-chart">
      <header>
        <h2>AssetAllocationChart</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
