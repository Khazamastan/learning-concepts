import { useEffect, useState } from 'react';
import './styles.css';

const BAR_COUNT = 3;

export default function App() {
  const [progress, setProgress] = useState(Array.from({ length: BAR_COUNT }, () => 0));
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) {
      return () => {};
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const clone = [...prev];
        const nextValue = Math.min(100, clone[activeIndex] + 4);
        clone[activeIndex] = nextValue;
        if (nextValue === 100) {
          clearInterval(interval);
          setActiveIndex((index) => (index + 1 < BAR_COUNT ? index + 1 : null));
        }
        return clone;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const startSequence = () => {
    setProgress(Array.from({ length: BAR_COUNT }, () => 0));
    setActiveIndex(0);
  };

  return (
    <main className="progress">
      <h1>Sequential Progress Bars</h1>
      <p>Each bar fills before the next one begins.</p>
      <button type="button" onClick={startSequence} disabled={activeIndex !== null}>
        {activeIndex === null ? 'Start sequence' : 'Running…'}
      </button>
      <section className="progress__bars">
        {progress.map((value, index) => (
          <div key={index} className="progress__bar">
            <div style={{ width: `${value}%` }} />
          </div>
        ))}
      </section>
    </main>
  );
}
