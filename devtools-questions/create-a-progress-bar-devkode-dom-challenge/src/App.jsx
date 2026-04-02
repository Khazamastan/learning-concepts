import { useEffect, useMemo, useState } from 'react';

const SPEED_OPTIONS = [
  { label: 'Slow', value: 120 },
  { label: 'Normal', value: 60 },
  { label: 'Fast', value: 20 },
];

export default function App() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(SPEED_OPTIONS[1].value);
  const [increments, setIncrements] = useState(1);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }
    const id = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + increments);
        if (next === 100) {
          setIsRunning(false);
        }
        return next;
      });
    }, speed);

    return () => clearInterval(id);
  }, [isRunning, speed, increments]);

  const formattedSpeed = useMemo(
    () => `${Math.round(1000 / speed)} updates/sec`,
    [speed],
  );

  const handleStart = () => {
    if (progress === 100) {
      setProgress(0);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setProgress(0);
  };

  return (
    <div className="container">
      <header>
        <h1>Accessible Progress Bar</h1>
        <p>
          Start the animation, adjust the speed or increment size, and pause or
          reset whenever you like.
        </p>
      </header>

      <div className="progress-shell" role="presentation">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="File upload progress"
          className="progress-track"
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}%</span>
      </div>

      <section className="controls">
        <div className="control-group">
          <span className="control-title">Speed</span>
          <div className="option-row">
            {SPEED_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={option.value === speed ? 'chip active' : 'chip'}
                onClick={() => setSpeed(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <small className="hint">{formattedSpeed}</small>
        </div>

        <div className="control-group">
          <label htmlFor="increments">Increment step</label>
          <input
            id="increments"
            type="range"
            min={1}
            max={10}
            value={increments}
            onChange={(event) => setIncrements(Number(event.target.value))}
          />
          <small className="hint">{increments} % per tick</small>
        </div>

        <div className="buttons">
          <button type="button" onClick={handleStart} disabled={isRunning}>
            {progress === 100 ? 'Restart' : 'Start'}
          </button>
          <button type="button" onClick={handlePause} disabled={!isRunning}>
            Pause
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </section>
    </div>
  );
}
