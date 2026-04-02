import { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <main className="counter">
      <h1>Counter App</h1>
      <div className="counter__value">{count}</div>
      <div className="counter__controls">
        <button type="button" onClick={() => setCount((prev) => prev - step)}>
          -{step}
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
        <button type="button" onClick={() => setCount((prev) => prev + step)}>
          +{step}
        </button>
      </div>
      <label className="counter__step">
        Step
        <input
          type="number"
          min="1"
          max="10"
          value={step}
          onChange={(event) => setStep(Math.max(1, Number(event.target.value)))}
        />
      </label>
    </main>
  );
}
