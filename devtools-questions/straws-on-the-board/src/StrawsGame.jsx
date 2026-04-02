import * as React from "react";
import { createBoard } from "./board.js";

const BOARD = createBoard(4);

export function StrawsGame() {
  const [activeEdges, setActiveEdges] = React.useState(new Set());
  const [completed, setCompleted] = React.useState(new Set());

  const toggleEdge = (edgeId) => {
    setActiveEdges((current) => {
      const next = new Set(current);
      if (next.has(edgeId)) {
        next.delete(edgeId);
      } else {
        next.add(edgeId);
      }
      return next;
    });
  };

  React.useEffect(() => {
    const completedSquares = BOARD.squares
      .filter((square) => square.edges.every((edgeId) => activeEdges.has(edgeId)))
      .map((square) => square.id);
    setCompleted(new Set(completedSquares));
  }, [activeEdges]);

  return (
    <div className="straws-app">
      <header>
        <h1>Straws on the Board</h1>
        <p>
          Classic dots-and-boxes style puzzle. Toggle straws (edges) between pegs to complete squares. Completed squares
          glow when all four edges are present.
        </p>
      </header>

      <section className="card board-card">
        <div className="board" style={{ gridTemplateColumns: `repeat(${BOARD.size}, 1fr)` }}>
          {Array.from({ length: BOARD.size * BOARD.size }, (_, index) => (
            <div key={`dot-${index}`} className="dot" />
          ))}
        </div>

        <div className="edges">
          {BOARD.edges.map((edge) => (
            <button
              key={edge.id}
              type="button"
              className={`edge ${edge.type} ${activeEdges.has(edge.id) ? "active" : ""}`}
              style={edgeStyle(edge, BOARD.size)}
              onClick={() => toggleEdge(edge.id)}
              aria-pressed={activeEdges.has(edge.id)}
              aria-label={`Edge ${edge.id}`}
            />
          ))}
          {BOARD.squares.map((square) => (
            <div
              key={square.id}
              className={`square ${completed.has(square.id) ? "completed" : ""}`}
              style={squareStyle(square, BOARD.size)}
            />
          ))}
        </div>
      </section>

      <section className="card info-card">
        <h2>Stats</h2>
        <p>Active straws: {activeEdges.size}</p>
        <p>Completed squares: {completed.size}</p>
        <button type="button" onClick={() => setActiveEdges(new Set())}>
          Reset board
        </button>
      </section>
    </div>
  );
}

function edgeStyle(edge, size) {
  const cell = 80;
  const gap = 16;
  const offset = 40;

  if (edge.type === "horizontal") {
    return {
      width: cell,
      height: 12,
      left: edge.col * (cell + gap) + offset,
      top: edge.row * (cell + gap) + offset - 6,
    };
  }

  return {
    height: cell,
    width: 12,
    left: edge.col * (cell + gap) + offset - 6,
    top: edge.row * (cell + gap) + offset,
  };
}

function squareStyle(square, size) {
  const cell = 80;
  const gap = 16;
  const offset = 40;
  const [row, col] = square.id.split("-").slice(1).map(Number);

  return {
    left: col * (cell + gap) + offset,
    top: row * (cell + gap) + offset,
    width: cell,
    height: cell,
  };
}
