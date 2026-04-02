import { useEffect, useState } from 'react';

const PHASES = ['Initialising', 'Fetching Data', 'Processing', 'Almost Done'];

export default function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % PHASES.length);
    }, 1600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="screen">
      <div className="card">
        <div className="loader" aria-live="polite" aria-label="Content is loading">
          <span className="loader__dot" />
          <span className="loader__dot" />
          <span className="loader__dot" />
          <span className="loader__dot" />
        </div>
        <p className="loader__status">{PHASES[index]}</p>
        <p className="loader__hint">Please hold on while we get everything ready.</p>
      </div>
    </div>
  );
}
