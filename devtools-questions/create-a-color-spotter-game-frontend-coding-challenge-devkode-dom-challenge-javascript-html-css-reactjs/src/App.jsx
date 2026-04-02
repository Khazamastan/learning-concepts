import { useEffect, useMemo, useState } from 'react';

const GAME_DURATION = 60;

function generateColor(level) {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.random() * 20;
  const lightness = 40 + Math.random() * 20;
  const delta = Math.max(16 - level, 4);
  return {
    base: `hsl(${hue} ${saturation}% ${lightness}%)`,
    odd: `hsl(${hue} ${saturation}% ${lightness + delta}%)`,
  };
}

export default function App() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setIsPlaying(false);
      }
      return undefined;
    }
    const id = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying, timeLeft]);

  const gridSize = useMemo(() => {
    const base = 2 + Math.floor(level / 2);
    return Math.min(base, 7);
  }, [level]);

  const totalTiles = gridSize ** 2;
  const specialIndex = useMemo(
    () => Math.floor(Math.random() * totalTiles),
    // totalTiles + level ensures a new index whenever level changes
    [totalTiles, level],
  );

  const colors = useMemo(() => generateColor(level), [level]);

  const handleTileClick = (tileIndex) => {
    if (!isPlaying) {
      return;
    }
    if (tileIndex === specialIndex) {
      setScore((prev) => prev + 10);
      setLevel((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - 5));
    }
  };

  const handleStart = () => {
    setLevel(1);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
  };

  return (
    <div className="game-shell">
      <header>
        <h1>Color Spotter</h1>
        <p>
          Tap the tile with a slightly different shade. Each correct guess
          speeds the game up. How high can you score in {GAME_DURATION} seconds?
        </p>
      </header>

      <aside className="hud">
        <div>
          <span className="label">Time</span>
          <strong>{timeLeft}s</strong>
        </div>
        <div>
          <span className="label">Score</span>
          <strong>{score}</strong>
        </div>
        <div>
          <span className="label">Level</span>
          <strong>{level}</strong>
        </div>
      </aside>

      <section
        className="grid"
        style={{
          '--grid-size': gridSize,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => (
          <button
            key={`${level}-${index}`}
            type="button"
            className="tile"
            style={{
              backgroundColor: index === specialIndex ? colors.odd : colors.base,
            }}
            onClick={() => handleTileClick(index)}
            aria-label={index === specialIndex ? 'Different color tile' : 'Normal tile'}
          />
        ))}
      </section>

      <footer>
        <button type="button" onClick={handleStart}>
          {isPlaying ? 'Restart' : score > 0 || timeLeft < GAME_DURATION ? 'Play again' : 'Start game'}
        </button>
        {!isPlaying && timeLeft !== GAME_DURATION && <p className="hint">Game over! Hit restart to try again.</p>}
      </footer>
    </div>
  );
}
