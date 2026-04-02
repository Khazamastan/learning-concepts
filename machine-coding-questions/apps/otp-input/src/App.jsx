import { useRef, useState } from 'react';
import './styles.css';

const LENGTH = 6;

export default function App() {
  const [values, setValues] = useState(Array.from({ length: LENGTH }, () => ''));
  const inputsRef = useRef([]);

  const focusIndex = (index) => {
    const node = inputsRef.current[index];
    if (node) node.focus();
  };

  const handleChange = (index) => (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    if (!value) {
      setValues((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
      return;
    }
    setValues((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });
    if (index < LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === 'Backspace' && !values[index] && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
      setValues((prev) => {
        const next = [...prev];
        next[index - 1] = '';
        return next;
      });
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
    }
    if (event.key === 'ArrowRight' && index < LENGTH - 1) {
      event.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (!text) return;
    const next = [...values];
    for (let i = 0; i < LENGTH; i += 1) {
      next[i] = text[i] ?? '';
    }
    setValues(next);
    const lastIndex = Math.min(text.length, LENGTH - 1);
    focusIndex(lastIndex);
  };

  const code = values.join('');

  return (
    <main className="otp-shell">
      <section className="otp-card">
        <header>
          <p className="eyebrow">Verification</p>
          <h1>OTP Input</h1>
          <p className="support">Auto focus, keyboard navigation, and paste support.</p>
        </header>
        <div className="inputs" onPaste={handlePaste}>
          {values.map((value, index) => (
            <input
              key={index}
              ref={(node) => (inputsRef.current[index] = node)}
              value={value}
              inputMode="numeric"
              maxLength={1}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
            />
          ))}
        </div>
        <footer className="code-display">
          <span>Code:</span>
          <strong>{code || '———'}</strong>
        </footer>
      </section>
    </main>
  );
}
