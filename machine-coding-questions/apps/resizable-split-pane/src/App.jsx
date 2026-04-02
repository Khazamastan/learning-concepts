import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function App() {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;

    const handleMove = (event) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      setPosition(Math.min(80, Math.max(20, next)));
    };

    const stop = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('mouseleave', stop);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('mouseleave', stop);
    };
  }, [isResizing]);

  return (
    <main className="split-shell">
      <section className="split-card" ref={containerRef}>
        <div className="pane" style={{ width: `${position}%` }}>
          <h2>Editor</h2>
          <p>Resize to allocate more space for code or preview content.</p>
        </div>
        <button
          type="button"
          className="divider"
          aria-label="Resize panels"
          aria-valuemin={20}
          aria-valuemax={80}
          aria-valuenow={Math.round(position)}
          role="separator"
          tabIndex={0}
          onMouseDown={() => setIsResizing(true)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              setPosition((prev) => Math.max(20, prev - 2));
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              setPosition((prev) => Math.min(80, prev + 2));
            }
          }}
        >
          <span />
        </button>
        <div className="pane" style={{ width: `${100 - position}%` }}>
          <h2>Preview</h2>
          <p>Ideal for side-by-side diffing, doc reading, or dashboards.</p>
        </div>
      </section>
    </main>
  );
}
