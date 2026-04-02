import React from 'react';
import { createRoot } from 'react-dom/client';
import { useSSR } from './useSSR.js';

function EnvironmentBadge() {
  const { isClient } = useSSR();
  return <span>{isClient ? 'Rendered in browser' : 'Rendered on server'}</span>;
}

function App() {
  return (
    <main>
      <h1>useSSR demo</h1>
      <EnvironmentBadge />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
