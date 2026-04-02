import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const SHAPE = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0]
];

const keyFrom = (row, col) => `${row}-${col}`;

export default function App() {
  const requiredCells = useMemo(
    () =>
      SHAPE.flatMap((row, rowIndex) =>
        row.reduce((acc, value, colIndex) => {
          if (value === 1) acc.push(keyFrom(rowIndex, colIndex));
          return acc;
        }, [])
      ),
    []
  );

  const [selected, setSelected] = useState([]);
  const [locked, setLocked] = useState(false);

  const totalInteractive = requiredCells.length;

  const handleToggle = (row, col) => {
    if (locked) return;
    if (!SHAPE[row][col]) return;

    const key = keyFrom(row, col);
    if (selected.includes(key)) return;

    setSelected((prev) => [...prev, key]);
  };

  useEffect(() => {
    if (selected.length === totalInteractive && totalInteractive > 0) {
      const queue = [...selected];
      setLocked(true);

      queue.forEach((key, index) => {
        setTimeout(() => {
          setSelected((prev) => prev.filter((item) => item !== key));
          if (index === queue.length - 1) {
            setTimeout(() => setLocked(false), 320);
          }
        }, index * 320);
      });
    }
  }, [selected, totalInteractive]);

  return (
    <main className="grid-shape">
      <header>
        <h1>Interactive Grid Shape</h1>
        <p>
          Select all highlighted cells to trigger an automatic deselect sequence.
        </p>
      </header>
      <section className="grid-shape__board">
        {SHAPE.map((row, rowIndex) => (
          <div className="grid-shape__row" key={rowIndex}>
            {row.map((value, colIndex) => {
              const key = keyFrom(rowIndex, colIndex);
              const isActive = value === 1;
              const isSelected = selected.includes(key);

              return (
                <button
                  key={key}
                  type="button"
                  className={`grid-shape__cell ${
                    isActive ? 'grid-shape__cell--active' : ''
                  } ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleToggle(rowIndex, colIndex)}
                  disabled={!isActive || locked}
                  aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
                />
              );
            })}
          </div>
        ))}
      </section>
      <footer className="grid-shape__footer">
        <span>
          Selected {selected.length} / {totalInteractive}
        </span>
        {locked && <span className="grid-shape__status">Deselecting…</span>}
      </footer>
    </main>
  );
}
