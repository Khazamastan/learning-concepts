import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function App() {
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(40);
  const [position, setPosition] = useState(0);
  const directionRef = useRef(1);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!running) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      return () => {};
    }

    let last = performance.now();
    const step = (now) => {
      const delta = now - last;
      last = now;
      setPosition((prev) => {
        let next = prev + (delta / 1000) * speed * directionRef.current;
        if (next >= 100) {
          next = 100;
          directionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          directionRef.current = 1;
        }
        return next;
      });
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [running, speed]);

  const reset = () => {
    setPosition(0);
    directionRef.current = 1;
    setRunning(false);
  };

  return (
    <main className="dot-demo">
      <header>
        <h1>Moving Dot Animation</h1>
        <p>Adjust speed and control the animation.</p>
      </header>
      <div className="dot-demo__track">
        <div className="dot-demo__dot" style={{ left: `${position}%` }} />
      </div>
      <div className="dot-demo__controls">
        <label>
          Speed ({speed} px/sec)
          <input
            type="range"
            min="10"
            max="120"
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>
        <div className="dot-demo__buttons">
          <button type="button" onClick={() => setRunning(true)}>
            Start
          </button>
          <button type="button" onClick={() => setRunning(false)}>
            Pause
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
