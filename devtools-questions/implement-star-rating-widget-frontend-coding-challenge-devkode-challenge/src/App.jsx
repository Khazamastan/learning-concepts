import { useMemo, useState } from 'react';

const CAPTIONS = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];

export default function App() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);

  const visibleRating = hovered ?? rating;

  const caption = useMemo(() => {
    if (visibleRating === 0) {
      return 'Tap a star to rate';
    }
    return CAPTIONS[visibleRating - 1];
  }, [visibleRating]);

  const handleKeyDown = (event, value) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setRating(value);
    }
  };

  return (
    <div className="rating-shell">
      <header>
        <h1>Star Rating Widget</h1>
        <p>Click or use the keyboard to set your rating. Hover previews the selection.</p>
      </header>

      <div className="stars" role="radiogroup" aria-label="Rate your experience">
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;
          const active = value <= visibleRating;
          return (
            <span
              key={value}
              role="radio"
              aria-checked={rating === value}
              tabIndex={0}
              className={active ? 'star active' : 'star'}
              onClick={() => setRating(value)}
              onKeyDown={(event) => handleKeyDown(event, value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
            >
              ★
            </span>
          );
        })}
      </div>

      <footer>
        <span className="caption">{caption}</span>
        {rating > 0 && (
          <button type="button" onClick={() => setRating(0)} className="reset">
            Clear rating
          </button>
        )}
      </footer>
    </div>
  );
}
