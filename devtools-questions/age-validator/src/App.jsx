import { useMemo, useState } from 'react';

const MIN_AGE = 18;
const MAX_AGE = 120;

const messages = {
  empty: 'Enter your age to continue.',
  tooYoung: `You must be at least ${MIN_AGE}.`,
  tooOld: `Age must be below ${MAX_AGE}.`,
  invalid: 'Please provide a valid whole number.',
  ok: 'You are good to proceed! ✅',
};

export default function App() {
  const [ageInput, setAgeInput] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const validation = useMemo(() => validateAge(ageInput), [ageInput]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setWasSubmitted(true);
    if (validation.type === 'success') {
      alert('Age verified successfully!');
    }
  };

  const hint = wasSubmitted ? validation.message : messages.empty;

  return (
    <div className="shell">
      <form className="card" onSubmit={handleSubmit} noValidate>
        <h1>Age Validator</h1>
        <p className="description">Enter your age to check if you can access restricted content.</p>
        <label htmlFor="age">Your age</label>
        <input
          id="age"
          name="age"
          value={ageInput}
          inputMode="numeric"
          aria-invalid={validation.type === 'error'}
          aria-describedby="age-hint"
          placeholder="e.g. 21"
          onChange={(event) => {
            setAgeInput(event.target.value);
            setWasSubmitted(false);
          }}
        />
        <p id="age-hint" className={`hint ${validation.type}`}>
          {hint}
        </p>
        <button type="submit">Validate</button>
      </form>
    </div>
  );
}

function validateAge(value) {
  if (value.trim() === '') {
    return { type: 'error', message: messages.empty };
  }

  if (!/^\d+$/.test(value)) {
    return { type: 'error', message: messages.invalid };
  }

  const age = Number(value);
  if (age < MIN_AGE) {
    return { type: 'error', message: messages.tooYoung };
  }

  if (age > MAX_AGE) {
    return { type: 'error', message: messages.tooOld };
  }

  return { type: 'success', message: messages.ok };
}
