import { useId, useMemo, useState } from 'react';

type StarRatingProps = {
  max?: number;
  value?: number;
  precision?: 0.5 | 1;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  label?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function StarRating({
  max = 5,
  value = 0,
  precision = 1,
  readOnly,
  onChange,
  label = 'Star rating',
}: StarRatingProps) {
  const [rating, setRating] = useState(() => clamp(value, 0, max));
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const gradientBaseId = useId();

  const stars = useMemo(() => Array.from({ length: max }), [max]);
  const activeValue = hoverValue ?? rating;

  const handleCommit = (nextValue: number) => {
    if (readOnly) return;
    const clamped = clamp(nextValue, 0, max);
    setRating(clamped);
    onChange?.(clamped);
  };

  const handlePointer = (index: number, offset: number) => {
    if (readOnly) return;
    const raw = index + offset;
    const resolved = precision === 0.5 ? Math.round(raw * 2) / 2 : Math.round(raw);
    setHoverValue(clamp(resolved, precision, max));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (readOnly) return;
    const { key, currentTarget } = event;
    const index = Number(currentTarget.dataset.index ?? 0);
    let delta = 0;
    if (key === 'ArrowRight' || key === 'ArrowUp') delta = precision;
    if (key === 'ArrowLeft' || key === 'ArrowDown') delta = -precision;
    if (key === 'Home') delta = -Infinity;
    if (key === 'End') delta = Infinity;
    if (delta === 0 && key !== ' ' && key !== 'Enter') return;
    event.preventDefault();
    if (key === ' ' || key === 'Enter') {
      handleCommit(index + precision);
    } else {
      const next = clamp(
        delta === Infinity ? max : delta === -Infinity ? precision : rating + delta,
        precision,
        max
      );
      setRating(next);
      onChange?.(next);
    }
  };

  return (
    <div className="star-rating">
      <p className="visually-hidden" id={`${gradientBaseId}-label`}>
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={`${gradientBaseId}-label`} className="star-rating__group">
        {stars.map((_, index) => {
          const starValue = index + 1;
          const fillFraction = clamp(activeValue - index, 0, 1);
          const gradientId = `${gradientBaseId}-gradient-${index}`;
          return (
            <button
              key={index}
              type="button"
              className={`star-rating__btn${fillFraction > 0 ? ' star-rating__btn--active' : ''}`}
              data-index={index}
              role="radio"
              aria-checked={rating >= starValue - (precision === 0.5 ? 0.5 : 0)}
              aria-label={`${index + 1} star${index === 0 ? '' : 's'}`}
              onPointerMove={(event) => {
                const { left, width } = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();
                const offset = precision === 0.5 ? ((event.clientX - left) / width >= 0.5 ? 1 : 0.5) : 1;
                handlePointer(index, offset);
              }}
              onPointerLeave={() => setHoverValue(null)}
              onClick={() => handleCommit(precision === 0.5 ? index + (hoverValue ?? precision) : starValue)}
              onFocus={() => setHoverValue(null)}
              onKeyDown={handleKeyDown}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="star-rating__icon">
                <defs>
                  <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset={`${fillFraction * 100}%`} stopColor="#facc15" />
                    <stop offset={`${fillFraction * 100}%`} stopColor="#e2e8f0" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#${gradientId})`}
                  stroke="#eeb422"
                  strokeWidth="1"
                  d="M12 2.5l2.955 6.093 6.72.977-4.846 4.638 1.144 6.64L12 17.77l-6.0 3.078 1.144-6.64-4.846-4.638 6.72-.977z"
                />
              </svg>
            </button>
          );
        })}
      </div>
      <output className="star-rating__value" aria-live="polite" role="status">
        {activeValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
      </output>
    </div>
  );
}
