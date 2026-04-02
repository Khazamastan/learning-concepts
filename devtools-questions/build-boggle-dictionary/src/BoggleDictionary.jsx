import * as React from "react";
import { findWords } from "./boggle.js";

const DEFAULT_BOARD = [
  ["t", "e", "r", "a"],
  ["o", "n", "l", "s"],
  ["c", "i", "a", "m"],
  ["h", "p", "d", "o"],
];

const DEFAULT_WORDS = ["learn", "react", "hooks", "map", "chart", "tone", "mail", "ship"];

export function BoggleDictionary() {
  const [board, setBoard] = React.useState(DEFAULT_BOARD);
  const [dictionaryText, setDictionaryText] = React.useState(DEFAULT_WORDS.join("\n"));
  const [minLength, setMinLength] = React.useState(3);
  const [results, setResults] = React.useState([]);
  const [selectedWord, setSelectedWord] = React.useState(null);

  const handleBoardChange = (rowIndex, colIndex, value) => {
    setBoard((current) =>
      current.map((row, r) =>
        row.map((cell, c) => (r === rowIndex && c === colIndex ? value.slice(0, 1).toLowerCase() || "" : cell)),
      ),
    );
  };

  const handleSolve = () => {
    const dictionary = dictionaryText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const matches = findWords(board, dictionary, { minLength: Number(minLength) || 3 });
    setResults(matches.sort((a, b) => b.word.length - a.word.length));
    setSelectedWord(null);
  };

  React.useEffect(() => {
    handleSolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const highlighted = new Set(
    selectedWord ? selectedWord.path.map(([r, c]) => `${r}-${c}`) : [],
  );

  return (
    <div className="boggle-app">
      <header>
        <h1>Build Boggle Dictionary</h1>
        <p>
          Enter a dictionary and explore all valid words on the grid using depth-first search with a trie for prefix
          pruning. Click a result to highlight its path.
        </p>
      </header>
      <div className="layout">
        <section className="card board-card">
          <h2>Board</h2>
          <div className="board">
            {board.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  value={value}
                  maxLength={1}
                  onChange={(event) => handleBoardChange(rowIndex, colIndex, event.target.value)}
                  className={highlighted.has(`${rowIndex}-${colIndex}`) ? "highlight" : ""}
                  aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
                />
              )),
            )}
          </div>
          <label className="min-length">
            Minimum length
            <input
              type="number"
              min="2"
              max="10"
              value={minLength}
              onChange={(event) => setMinLength(event.target.value)}
            />
          </label>
          <button type="button" onClick={handleSolve}>
            Find words
          </button>
        </section>

        <section className="card dictionary-card">
          <h2>Dictionary</h2>
          <textarea
            value={dictionaryText}
            onChange={(event) => setDictionaryText(event.target.value)}
            rows={12}
            spellCheck="false"
          />
          <p className="hint">One word per line. Non alphabetic characters are stripped before matching.</p>
        </section>

        <section className="card results-card">
          <h2>Results ({results.length})</h2>
          <ul>
            {results.map((entry) => (
              <li key={`${entry.word}-${entry.path.length}`}>
                <button
                  type="button"
                  onClick={() => setSelectedWord(entry)}
                  className={selectedWord?.word === entry.word && selectedWord?.path === entry.path ? "active" : ""}
                >
                  <span>{entry.word}</span>
                  <small>{entry.path.length} letters</small>
                </button>
              </li>
            ))}
          </ul>
          {!results.length && <p>No matches found. Try expanding your dictionary.</p>}
        </section>
      </div>
    </div>
  );
}
