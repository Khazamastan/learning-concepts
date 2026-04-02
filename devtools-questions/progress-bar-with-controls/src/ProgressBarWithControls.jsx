import * as React from "react";
import { useInterval } from "./useInterval";

const MAX_PROGRESS = 100;
const SPEED_OPTIONS = [
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
];

export function ProgressBarWithControls() {
  const [progress, setProgress] = React.useState(0);
  const [speed, setSpeed] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [loop, setLoop] = React.useState(true);
  const baseInterval = 80;

  useInterval(
    () => {
      setProgress((value) => {
        const next = value + 1 * speed;
        if (next >= MAX_PROGRESS) {
          if (loop) {
            return 0;
          }
          setIsPlaying(false);
          return MAX_PROGRESS;
        }
        return next;
      });
    },
    isPlaying ? baseInterval : null,
  );

  const togglePlay = () => {
    setIsPlaying((playing) => {
      if (!playing && progress >= MAX_PROGRESS && !loop) {
        return false;
      }
      return !playing;
    });
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const jump = (amount) => {
    setProgress((value) => Math.max(0, Math.min(MAX_PROGRESS, value + amount)));
  };

  const percentage = Math.min(progress, MAX_PROGRESS);
  const statusLabel = isPlaying ? "Playing" : "Paused";

  return (
    <div className="progress-demo">
      <header>
        <h1>Progress Bar with Controls</h1>
        <p>
          Demonstrates keyboard-accessible controls for a determinate progress bar with
          jump buttons, playback speed, looping, and live status text.
        </p>
      </header>

      <section className="progress-card" role="group" aria-labelledby="progress-label">
        <div className="progress-track" aria-live="polite">
          <div
            className={`progress-fill ${percentage >= 100 ? "is-complete" : ""}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="progress-meta">
          <div id="progress-label">
            {percentage.toFixed(0)}% <span aria-hidden="true">•</span> {statusLabel}
          </div>
          <button type="button" onClick={() => jump(-10)} aria-label="Jump back 10%">
            −10%
          </button>
          <button type="button" onClick={() => jump(10)} aria-label="Jump forward 10%">
            +10%
          </button>
        </div>
      </section>

      <section className="controls">
        <button type="button" onClick={togglePlay} className="primary">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <label className="toggle">
          <input
            type="checkbox"
            checked={loop}
            onChange={(event) => setLoop(event.target.checked)}
          />
          Loop playback
        </label>
      </section>

      <section className="speed">
        <span>Speed</span>
        <div className="speed-options" role="radiogroup" aria-label="Playback speed">
          {SPEED_OPTIONS.map((option) => (
            <label key={option.value} className={option.value === speed ? "active" : ""}>
              <input
                type="radio"
                name="speed"
                value={option.value}
                checked={option.value === speed}
                onChange={() => setSpeed(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
