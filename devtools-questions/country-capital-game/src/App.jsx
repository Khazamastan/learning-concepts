import { useEffect, useState } from 'react';
import './styles.css';

const DATA = {
  India: 'Delhi',
  Russia: 'Moscow',
  Germany: 'Berlin',
  Japan: 'Tokyo',
  Brazil: 'Brasília',
  Australia: 'Canberra'
};

const shuffle = (input) => {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const buildDeck = () => {
  const entries = Object.entries(DATA);
  const cards = entries.flatMap(([country, capital], index) => [
    { id: `country-${index}`, label: country, value: country, type: 'country' },
    { id: `capital-${index}`, label: capital, value: country, type: 'capital' }
  ]);
  return shuffle(cards);
};

export default function App() {
  const [cards, setCards] = useState(() => buildDeck());
  const [selection, setSelection] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (selection.length === 2) {
      const [firstId, secondId] = selection;
      const first = cards.find((card) => card.id === firstId);
      const second = cards.find((card) => card.id === secondId);

      if (first && second && first.type !== second.type && first.value === second.value) {
        setMatched((prev) => [...prev, firstId, secondId]);
        setSelection([]);
      } else {
        const timeout = setTimeout(() => setSelection([]), 800);
        return () => clearTimeout(timeout);
      }
    }
  }, [selection, cards]);

  const handleSelect = (cardId) => {
    if (selection.includes(cardId)) return;
    if (matched.includes(cardId)) return;
    if (selection.length === 2) return;
    setSelection((prev) => [...prev, cardId]);
  };

  const resetGame = () => {
    setCards(buildDeck());
    setSelection([]);
    setMatched([]);
  };

  const isComplete = matched.length === cards.length;

  return (
    <main className="match-game">
      <header>
        <h1>Country–Capital Game</h1>
        <p>Match each country with its correct capital city.</p>
        <button type="button" onClick={resetGame}>
          Shuffle Cards
        </button>
      </header>
      <section className="match-game__grid">
        {cards.map((card) => {
          const isSelected = selection.includes(card.id);
          const isMatched = matched.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              className={`match-card ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''}`}
              onClick={() => handleSelect(card.id)}
              disabled={isMatched}
            >
              <span>{card.label}</span>
              <small>{card.type === 'country' ? 'Country' : 'Capital'}</small>
            </button>
          );
        })}
      </section>
      {isComplete && <p className="match-game__banner">All pairs matched — well done!</p>}
    </main>
  );
}
