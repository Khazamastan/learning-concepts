import * as React from "react";

export function useTimer({ initialSeconds = 0, mode = "stopwatch", interval = 1000 } = {}) {
  const [seconds, setSeconds] = React.useState(initialSeconds);
  const [status, setStatus] = React.useState("idle");
  const savedInterval = React.useRef(null);

  const clear = React.useCallback(() => {
    if (savedInterval.current) {
      clearInterval(savedInterval.current);
      savedInterval.current = null;
    }
  }, []);

  const start = React.useCallback(() => {
    clear();
    setStatus("running");
    savedInterval.current = setInterval(() => {
      setSeconds((current) => {
        if (mode === "countdown") {
          if (current <= 0) {
            setStatus("completed");
            clear();
            return 0;
          }
          return current - 1;
        }
        return current + 1;
      });
    }, interval);
  }, [clear, interval, mode]);

  const pause = React.useCallback(() => {
    clear();
    setStatus("paused");
  }, [clear]);

  const reset = React.useCallback(() => {
    clear();
    setSeconds(initialSeconds);
    setStatus("idle");
  }, [clear, initialSeconds]);

  React.useEffect(() => {
    return clear;
  }, [clear]);

  const formatted = format(seconds);

  return {
    seconds,
    formatted,
    status,
    start,
    pause,
    reset,
    setSeconds,
  };
}

function format(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}
