import React, { useEffect, useRef, useState } from 'react';

export default function PingPongCounter() {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const directionRef = useRef(1);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setValue((prev) => {
        if (prev === 10) {
          directionRef.current = -1;
        } else if (prev === 0) {
          directionRef.current = 1;
        }
        return prev + directionRef.current;
      });
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [isRunning]);

  const handlePlay = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    directionRef.current = 1;
    setValue(0);
  };

  return (
    <div>
      <h2>Ping-Pong Counter: {value}</h2>
      <button type="button" onClick={handlePlay} disabled={isRunning}>
        Play
      </button>
      <button type="button" onClick={handlePause} disabled={!isRunning}>
        Pause
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
