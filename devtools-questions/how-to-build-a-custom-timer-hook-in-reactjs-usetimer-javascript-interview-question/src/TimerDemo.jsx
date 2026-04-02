import * as React from "react";
import { useTimer } from "./useTimer.js";

export function TimerDemo() {
  const [mode, setMode] = React.useState("stopwatch");
  const [initial, setInitial] = React.useState(90);
  const timer = useTimer({ initialSeconds: mode === "countdown" ? initial : 0, mode });

  React.useEffect(() => {
    timer.reset();
  }, [mode]);

  return (
    <div className="timer">
      <div className="timer-display">{timer.formatted}</div>
      <div className="timer-status">Status: {timer.status}</div>
      <div className="controls">
        <button type="button" onClick={timer.start} disabled={timer.status === "running" && mode === "stopwatch"}>
          Start
        </button>
        <button type="button" onClick={timer.pause} disabled={timer.status !== "running"}>
          Pause
        </button>
        <button type="button" onClick={timer.reset}>
          Reset
        </button>
      </div>
      <fieldset className="mode-picker">
        <legend>Mode</legend>
        <label>
          <input
            type="radio"
            name="mode"
            value="stopwatch"
            checked={mode === "stopwatch"}
            onChange={() => setMode("stopwatch")}
          />
          Stopwatch
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="countdown"
            checked={mode === "countdown"}
            onChange={() => setMode("countdown")}
          />
          Countdown
        </label>
      </fieldset>
      {mode === "countdown" ? (
        <label className="countdown-input">
          Countdown seconds
          <input
            type="number"
            min="1"
            value={initial}
            onChange={(event) => setInitial(Number(event.target.value))}
          />
        </label>
      ) : null}
    </div>
  );
}
