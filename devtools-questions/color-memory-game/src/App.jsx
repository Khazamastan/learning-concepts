import { useState, useEffect, useMemo } from 'react';
import './styles.css';

const COLORS = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#9C27B0', '#FF9800'];

function buildDeck() {
  const base = COLORS.map((color, pairIndex) => ({ color, pairId: pairIndex }));
  const doubled = [...base, ...base].map((card, index) => ({ ...card, id: index }));

  for (let i = doubled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled;
}

function Card({ color, revealed, matched, onClick }) {
  return (
    <button
      type="button"
      className={`card ${revealed ? 'card--revealed' : ''} ${matched ? 'card--matched' : ''}`}
      onClick={onClick}
      disabled={revealed || matched}
      aria-label={revealed || matched ? 'matched card' : 'hidden card'}
    >
      <span
        className="card__face"
        style={{ backgroundColor: revealed || matched ? color : '#1f2937' }}
      />
    </button>
  );
}

export default function App() {
  const [cards, setCards] = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);

  const totalPairs = useMemo(() => COLORS.length, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      setMoves((prev) => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedPairs((prev) =>
          prev.includes(firstCard.pairId) ? prev : [...prev, firstCard.pairId]
        );
        setFlipped([]);
      } else {
        const timeout = setTimeout(() => setFlipped([]), 700);
        return () => clearTimeout(timeout);
      }
    }
  }, [flipped, cards]);

  const isComplete = matchedPairs.length === totalPairs;

  const handleCardClick = (index) => {
    if (flipped.length === 2) return;
    if (flipped.includes(index)) return;

    const card = cards[index];
    if (matchedPairs.includes(card.pairId)) return;

    setFlipped((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setCards(buildDeck());
    setMatchedPairs([]);
    setFlipped([]);
    setMoves(0);
  };

  return (
    <main className="memory-game">
      <header className="memory-game__header">
        <h1>Color Memory Game</h1>
        <div className="memory-game__stats">
          <span>Moves: {moves}</span>
          <span>Matches: {matchedPairs.length}/{totalPairs}</span>
        </div>
        <button type="button" className="memory-game__reset" onClick={resetGame}>
          Restart Game
        </button>
      </header>
      <section className="memory-game__grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            color={card.color}
            revealed={flipped.includes(index)}
            matched={matchedPairs.includes(card.pairId)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </section>
      {isComplete && (
        <p className="memory-game__message">🎉 Great job! You found all the matches.</p>
      )}
    </main>
  );
}
