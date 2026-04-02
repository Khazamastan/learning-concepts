import { useMemo, useState } from 'react';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

export default function App() {
  const [hoverSquare, setHoverSquare] = useState(null);

  const squares = useMemo(
    () =>
      ranks.flatMap((rank) =>
        files.map((file, index) => ({
          id: `${file}${rank}`,
          dark: (rank + index) % 2 === 1,
          rank,
          file,
        })),
      ),
    [],
  );

  return (
    <div className="page">
      <header>
        <h1>Chess Board</h1>
        <p>Hover or focus a square to see its algebraic notation.</p>
        <div className="annotation">
          Active square: <strong>{hoverSquare ?? '—'}</strong>
        </div>
      </header>
      <div className="board">
        {squares.map((square) => (
          <button
            key={square.id}
            type="button"
            className={square.dark ? 'square dark' : 'square light'}
            onFocus={() => setHoverSquare(square.id)}
            onBlur={() => setHoverSquare((value) => (value === square.id ? null : value))}
            onMouseEnter={() => setHoverSquare(square.id)}
            onMouseLeave={() => setHoverSquare((value) => (value === square.id ? null : value))}
            aria-label={`Square ${square.id}`}
          >
            <span className="notation">
              <span>{square.file}</span>
              <span>{square.rank}</span>
            </span>
          </button>
        ))}
        {files.map((file) => (
          <span key={`file-${file}`} className="file-label">
            {file}
          </span>
        ))}
        {ranks.map((rank) => (
          <span key={`rank-${rank}`} className="rank-label">
            {rank}
          </span>
        ))}
      </div>
    </div>
  );
}
