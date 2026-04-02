import * as React from "react";
import { findKnightPath } from "./knightPath.js";

const BOARD_SIZE = 8;

export function ChessPathFinder() {
  const [start, setStart] = React.useState([0, 0]);
  const [end, setEnd] = React.useState([7, 7]);
  const [path, setPath] = React.useState([]);

  React.useEffect(() => {
    setPath(findKnightPath(start, end, BOARD_SIZE));
  }, [start, end]);

  const handleCellClick = (row, col, modifier) => {
    if (modifier === "start") {
      setStart([row, col]);
    } else {
      setEnd([row, col]);
    }
  };

  const pathSet = new Set(path.map((position) => position.join(",")));

  return (
    <div className="chess-app">
      <header>
        <h1>Chess Path Finder Visualiser</h1>
        <p>
          Visualise the shortest knight path between two squares using Breadth First Search.
          Click a square to set the end position, or hold Shift while clicking to set the start.
        </p>
      </header>

      <section className="card board-card">
        <div className="board" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
          {Array.from({ length: BOARD_SIZE }).map((_, row) =>
            Array.from({ length: BOARD_SIZE }).map((_, col) => {
              const isStart = start[0] === row && start[1] === col;
              const isEnd = end[0] === row && end[1] === col;
              const inPath = pathSet.has([row, col].join(","));
              return (
                <button
                  key={`${row}-${col}`}
                  type="button"
                  className={`cell ${isStart ? "start" : ""} ${isEnd ? "end" : ""} ${inPath ? "path" : ""} ${
                    (row + col) % 2 === 0 ? "light" : "dark"
                  }`}
                  onClick={(event) => handleCellClick(row, col, event.shiftKey ? "start" : "end")}
                  aria-label={`Square ${String.fromCharCode(97 + col)}${BOARD_SIZE - row}`}
                >
                  {isStart ? "S" : isEnd ? "E" : ""}
                </button>
              );
            }),
          )}
        </div>
      </section>

      <section className="card info-card">
        <h2>Path</h2>
        {path.length ? (
          <ol>
            {path.map(([row, col], index) => (
              <li key={`${row}-${col}`}>
                {index + 1}. {String.fromCharCode(97 + col)}
                {BOARD_SIZE - row}
              </li>
            ))}
          </ol>
        ) : (
          <p>No path found.</p>
        )}
      </section>
    </div>
  );
}
