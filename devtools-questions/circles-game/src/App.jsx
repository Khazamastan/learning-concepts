import { useState } from 'react';
import './styles.css';

const SIZE = 6;
const TARGET = 4;

const createBoard = () =>
  Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => null));

function hasWinner(board, player) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      if (board[row][col] !== player) continue;
      for (const [deltaRow, deltaCol] of directions) {
        let streak = 1;
        let nextRow = row + deltaRow;
        let nextCol = col + deltaCol;
        while (
          nextRow >= 0 &&
          nextRow < SIZE &&
          nextCol >= 0 &&
          nextCol < SIZE &&
          board[nextRow][nextCol] === player
        ) {
          streak += 1;
          if (streak === TARGET) {
            return true;
          }
          nextRow += deltaRow;
          nextCol += deltaCol;
        }
      }
    }
  }

  return false;
}

function boardFull(board) {
  return board.every((row) => row.every(Boolean));
}

export default function App() {
  const [board, setBoard] = useState(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState('R');
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState(0);

  const status =
    winner === 'R'
      ? `Red wins in ${moves} moves`
      : winner === 'G'
      ? `Green wins in ${moves} moves`
      : winner === 'draw'
      ? `Draw after ${moves} moves`
      : `Current turn: ${currentPlayer === 'R' ? 'Red' : 'Green'}`;

  const handleSelect = (rowIndex, colIndex) => {
    if (winner) return;
    if (board[rowIndex][colIndex]) return;

    setBoard((previous) => {
      const next = previous.map((row) => [...row]);
      next[rowIndex][colIndex] = currentPlayer;

      setMoves((prev) => prev + 1);

      if (hasWinner(next, currentPlayer)) {
        setWinner(currentPlayer);
      } else if (boardFull(next)) {
        setWinner('draw');
      } else {
        setCurrentPlayer((player) => (player === 'R' ? 'G' : 'R'));
      }

      return next;
    });
  };

  const reset = () => {
    setBoard(createBoard());
    setCurrentPlayer('R');
    setWinner(null);
    setMoves(0);
  };

  return (
    <main className="circles-game">
      <header className="circles-game__header">
        <div>
          <h1>Circles Game</h1>
          <p>{status}</p>
        </div>
        <button type="button" onClick={reset}>
          Restart
        </button>
      </header>
      <section className="circles-game__board">
        {board.map((row, rowIndex) => (
          <div className="circles-game__row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                className={`circles-game__cell ${
                  cell === 'R'
                    ? 'circles-game__cell--red'
                    : cell === 'G'
                    ? 'circles-game__cell--green'
                    : ''
                }`}
                onClick={() => handleSelect(rowIndex, colIndex)}
                disabled={Boolean(cell) || Boolean(winner)}
                aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
              >
                <span />
              </button>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
