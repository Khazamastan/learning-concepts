import * as React from "react";

const CHECKS = [
  { id: "length", label: "At least 12 characters", test: (value) => value.length >= 12 },
  { id: "upper", label: "Contains uppercase letters", test: (value) => /[A-Z]/.test(value) },
  { id: "lower", label: "Contains lowercase letters", test: (value) => /[a-z]/.test(value) },
  { id: "number", label: "Contains digits", test: (value) => /\d/.test(value) },
  { id: "symbol", label: "Contains symbols", test: (value) => /[^A-Za-z0-9]/.test(value) },
  { id: "entropy", label: "No obvious sequences", test: (value) => !/(?:1234|abcd|password|qwerty)/i.test(value) },
];

const SCORE_LABELS = [
  { threshold: 0, label: "Too weak", tone: "weak" },
  { threshold: 2, label: "Weak", tone: "weak" },
  { threshold: 4, label: "Okay", tone: "medium" },
  { threshold: 6, label: "Strong", tone: "strong" },
];

function evaluate(value) {
  const results = CHECKS.map((check) => ({ ...check, passed: check.test(value) }));
  const passed = results.filter((item) => item.passed).length;
  const label = SCORE_LABELS.reduce((acc, entry) => (passed >= entry.threshold ? entry : acc));
  return { results, passed, label };
}

export function PasswordStrengthChecker() {
  const [password, setPassword] = React.useState("Velocity-2026!");
  const evaluation = React.useMemo(() => evaluate(password), [password]);

  return (
    <main className="container">
      <header>
        <h1>Password Strength Checker</h1>
        <p>
          Enter a password to see strength feedback in real time. Strong passwords blend length, character diversity, and avoid
          predictable patterns.
        </p>
      </header>
      <section className="panel">
        <label>
          <span className="label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby="strength"
            autoFocus
          />
        </label>
        <StrengthMeter passed={evaluation.passed} tone={evaluation.label.tone} total={CHECKS.length} />
        <p id="strength" className={`strength strength--${evaluation.label.tone}`}>
          {evaluation.label.label}
        </p>
        <ul className="checklist">
          {evaluation.results.map((check) => (
            <li key={check.id} className={check.passed ? "check check--pass" : "check"}>
              <span aria-hidden="true">{check.passed ? "✔" : "○"}</span>
              {check.label}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function StrengthMeter({ passed, total, tone }) {
  const percent = Math.round((passed / total) * 100);
  return (
    <div className="meter" role="presentation">
      <div className={`meter-bar meter-bar--${tone}`} style={{ width: `${percent}%` }} />
    </div>
  );
}
