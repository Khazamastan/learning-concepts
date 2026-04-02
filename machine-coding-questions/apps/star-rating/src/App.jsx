import { useCallback, useMemo, useState } from 'react';
import './styles.css';

const TOTAL_STARS = 5;
const LABELS = ['Terrible', 'Bad', 'Okay', 'Good', 'Great'];

const clampToHalf = (value) => Math.max(0, Math.min(TOTAL_STARS, Math.round(value * 2) / 2));

export default function App() {
  const [rating, setRating] = useState(3.5);
  const [hoveredRating, setHoveredRating] = useState(null);

  const displayRating = hoveredRating ?? rating;

  const descriptor = useMemo(() => {
    if (displayRating === 0) return 'Not rated yet';
    const index = Math.min(LABELS.length - 1, Math.ceil(displayRating) - 1);
    return LABELS[index];
  }, [displayRating]);

  const announce = `${displayRating.toFixed(1)} out of ${TOTAL_STARS}`;

  const updateFromPointer = useCallback((event, index) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isHalf = event.clientX - rect.left <= rect.width / 2;
    const nextValue = clampToHalf(index + (isHalf ? 0.5 : 1));
    setHoveredRating(nextValue);
  }, []);

  const clearHover = useCallback(() => setHoveredRating(null), []);

  const commitValue = useCallback((value) => {
    setRating(value);
    setHoveredRating(null);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        setRating((prev) => clampToHalf(prev + 0.5));
      }
      if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        setRating((prev) => clampToHalf(prev - 0.5));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setRating(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setRating(TOTAL_STARS);
      }
    },
    []
  );

  return (
    <main className="page-shell">
      <section
        className="rating-card"
        role="slider"
        aria-label="Movie rating"
        aria-valuemin={0}
        aria-valuemax={TOTAL_STARS}
        aria-valuenow={displayRating}
        aria-valuetext={announce}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <header className="rating-header">
          <p className="eyebrow">React 19 Demo</p>
          <h1>Rate this experience</h1>
          <p className="support">Supports half-star precision with keyboard and mouse.</p>
        </header>
        <div className="stars" aria-hidden="true">
          {Array.from({ length: TOTAL_STARS }).map((_, index) => {
            const fill = Math.max(0, Math.min(1, displayRating - index)) * 100;
            const value = clampToHalf(index + 1);
            return (
              <button
                key={index}
                type="button"
                className="star-button"
                onMouseMove={(event) => updateFromPointer(event, index)}
                onMouseLeave={clearHover}
                onClick={() => commitValue(fill >= 50 ? value : value - 0.5)}
                onFocus={() => setHoveredRating(value)}
                onBlur={clearHover}
                aria-label={`Set rating to ${value}`}
              >
                <span className="star-outline">★</span>
                <span className="star-fill" style={{ width: `${fill}%` }}>
                  ★
                </span>
              </button>
            );
          })}
        </div>
        <footer className="rating-footer">
          <output className="rating-value">{announce}</output>
          <span className="rating-label">{descriptor}</span>
        </footer>
      </section>
    </main>
  );
}
