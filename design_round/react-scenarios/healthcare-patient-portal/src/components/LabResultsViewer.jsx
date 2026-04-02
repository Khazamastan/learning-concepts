import React from 'react';

export function LabResultsViewer({ data = {} }) {
  return (
    <section className="component lab-results-viewer">
      <header>
        <h2>LabResultsViewer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
