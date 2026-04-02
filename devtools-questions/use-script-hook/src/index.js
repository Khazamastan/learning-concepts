import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useScript } from './useScript.js';

function ChartLoader() {
  const [enabled, setEnabled] = useState(false);
  const status = useScript(enabled ? 'https://cdn.jsdelivr.net/npm/chart.js' : null);

  return (
    <section>
      <p>Chart.js status: {status}</p>
      <button type="button" onClick={() => setEnabled((value) => !value)}>
        {enabled ? 'Unload (no-op)' : 'Load Chart.js'}
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>useScript demo</h1>
      <ChartLoader />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
