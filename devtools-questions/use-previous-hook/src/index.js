import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { usePrevious } from './usePrevious.js';

function Counter() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  useEffect(() => {
    const id = setInterval(() => setCount((value) => value + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p>
      Current: {count} | Previous: {previous ?? '—'}
    </p>
  );
}

function App() {
  return (
    <main>
      <h1>usePrevious demo</h1>
      <Counter />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
