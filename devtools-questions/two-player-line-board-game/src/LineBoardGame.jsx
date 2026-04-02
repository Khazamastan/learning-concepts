import * as React from "react";
import { calculateWinner } from "./winner.js";

const SIZE = 12;
const PLAYERS = [
  { id: "R", label: "Player One", color: "#ef4444" },
  { id: "G", label: "Player Two", color: "#22c55e" },
];

export function LineBoardGame() {
  const [history, setHistory] = React.useState([
    { board: createEmptyBoard(), move: null },
  ]);
  const [step, setStep] = React.useState(0);
  const [reverse, setReverse] = React.useState(false);

  const current = history[step];
  const winner = calculateWinner(current.board);
  const nextPlayer = PLAYERS[step % 2];

  const handleCellClick = (row, col) => {
    if (winner || current.board[row][col]) return;

    const board = cloneBoard(current.board);
    board[row][col] = nextPlayer.id;
    setHistory((prev) => [...prev.slice(0, step + 1), { board, move: { row, col, player: nextPlayer } }]);
    setStep((prev) => prev + 1);
  };

  const jumpTo = (moveIndex) => setStep(moveIndex);

  const moves = history.map((snapshot, move) => {
    if (!snapshot.move) return { label: "Start", move };
    const { row, col, player } = snapshot.move;
    return {
      move,
      label: `Move #${move}: ${player.label} → ${String.fromCharCode(65 + row)}${col + 1}`,
    };
  });

  const displayMoves = reverse ? [...moves].reverse() : moves;

  return (
    <div className="line-game">
      <header>
        <h1>Two-Player Line Board Game</h1>
        <p>
          Players alternate placing markers on a 12×12 board. First to align five markers horizontally, vertically, or
          diagonally wins. Replay moves via the history panel.
        </p>
      </header>

      <div className="layout">
        <section className="card board-card">
          <Board board={current.board} onCellClick={handleCellClick} winner={winner} />
          <div className="status">
            {winner ? (
              <span className="winner">
                Winner: {PLAYERS.find((p) => p.id === winner.player)?.label}
              </span>
            ) : (
              <span>
                Turn: <strong style={{ color: nextPlayer.color }}>{nextPlayer.label}</strong>
              </span>
            )}
          </div>
        </section>

        <section className="card history-card">
          <div className="history-header">
            <h2>History</h2>
            <label className="toggle">
              <input type="checkbox" checked={reverse} onChange={(event) => setReverse(event.target.checked)} />
              Reverse order
            </label>
          </div>
          <ol>
            {displayMoves.map(({ move, label }) => (
              <li key={label}>
                <button type="button" onClick={() => jumpTo(move)} disabled={move === step}>
                  {label}
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function Board({ board, onCellClick, winner }) {
  const pathSet = new Set((winner?.path ?? []).map(([row, col]) => `${row}-${col}`));
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWinnerCell = pathSet.has(`${rowIndex}-${colIndex}`);
          const player = PLAYERS.find((p) => p.id === cell);
          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              type="button"
              className={`cell ${isWinnerCell ? "winning" : ""}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              style={{ "--marker-color": player?.color ?? "#94a3b8" }}
            >
              {cell && <span className="marker" style={{ background: player.color }} />}
            </button>
          );
        }),
      )}
    </div>
  );
}

function createEmptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}
