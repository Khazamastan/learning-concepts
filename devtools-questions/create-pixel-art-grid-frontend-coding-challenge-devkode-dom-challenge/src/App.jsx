import { useMemo, useState } from 'react';

const DEFAULT_SIZE = 16;
const PALETTE = ['#000000', '#f97316', '#facc15', '#22d3ee', '#6366f1', '#ec4899', '#22c55e', '#ffffff'];

function createBlank(size) {
  return Array.from({ length: size * size }, () => '#ffffff');
}

export default function App() {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [pixels, setPixels] = useState(() => createBlank(DEFAULT_SIZE));
  const [activeColor, setActiveColor] = useState(PALETTE[0]);
  const [isPainting, setIsPainting] = useState(false);

  const cssColumns = useMemo(() => `repeat(${size}, 1fr)`, [size]);

  const handlePaint = (index) => {
    setPixels((draft) => {
      const next = [...draft];
      next[index] = activeColor;
      return next;
    });
  };

  const handleSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setSize(newSize);
    setPixels(createBlank(newSize));
  };

  return (
    <div className="app">
      <header>
        <h1>Pixel Art Grid</h1>
        <p>Pick a colour, then click and drag across the canvas to paint your masterpiece.</p>
      </header>

      <section className="toolbar">
        <div className="palette">
          {PALETTE.map((color) => (
            <button
              key={color}
              type="button"
              className={color === activeColor ? 'swatch active' : 'swatch'}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
              aria-label={`Select colour ${color}`}
            />
          ))}
        </div>
        <label className="size-control">
          Grid size
          <input
            type="range"
            min={8}
            max={32}
            value={size}
            onChange={handleSizeChange}
          />
          <span>{size} × {size}</span>
        </label>
        <button
          type="button"
          className="clear"
          onClick={() => setPixels(createBlank(size))}
        >
          Clear canvas
        </button>
      </section>

      <section
        className="canvas"
        style={{ gridTemplateColumns: cssColumns }}
        onMouseLeave={() => setIsPainting(false)}
      >
        {pixels.map((color, index) => (
          <div
            key={index}
            className="pixel"
            style={{ backgroundColor: color }}
            onMouseDown={() => {
              setIsPainting(true);
              handlePaint(index);
            }}
            onMouseUp={() => setIsPainting(false)}
            onMouseEnter={() => {
              if (isPainting) {
                handlePaint(index);
              }
            }}
            role="presentation"
          />
        ))}
      </section>
    </div>
  );
}
