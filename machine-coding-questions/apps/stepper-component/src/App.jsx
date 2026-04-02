import { useMemo, useState } from 'react';
import './styles.css';

const STEPS = [
  { id: 'profile', label: 'Profile' },
  { id: 'team', label: 'Team' },
  { id: 'review', label: 'Review' }
];

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({ name: '', role: '', team: '', notes: '' });

  const allValid = useMemo(() => form.name && form.role && form.team, [form]);

  const nextStep = () => setStepIndex((index) => Math.min(index + 1, STEPS.length - 1));
  const prevStep = () => setStepIndex((index) => Math.max(index - 1, 0));

  return (
    <main className="stepper-shell">
      <section className="stepper-card">
        <header>
          <p className="eyebrow">Onboarding</p>
          <h1>Stepper Component</h1>
          <p className="support">Track multi-step progress with contextual actions.</p>
        </header>
        <ol className="stepper">
          {STEPS.map((step, index) => (
            <li key={step.id} className={index === stepIndex ? 'step active' : index < stepIndex ? 'step complete' : 'step'}>
              <span className="indicator">{index + 1}</span>
              <span>{step.label}</span>
            </li>
          ))}
        </ol>
        <form className="content">
          {stepIndex === 0 && (
            <div className="panel">
              <label>
                <span>Full name</span>
                <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
              </label>
              <label>
                <span>Role</span>
                <input value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))} />
              </label>
            </div>
          )}
          {stepIndex === 1 && (
            <div className="panel">
              <label>
                <span>Team</span>
                <input value={form.team} onChange={(event) => setForm((prev) => ({ ...prev, team: event.target.value }))} />
              </label>
              <label>
                <span>Notes</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                />
              </label>
            </div>
          )}
          {stepIndex === 2 && (
            <div className="panel review">
              <h2>Confirm details</h2>
              <dl>
                <div>
                  <dt>Name</dt>
                  <dd>{form.name || '—'}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{form.role || '—'}</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{form.team || '—'}</dd>
                </div>
                <div>
                  <dt>Notes</dt>
                  <dd>{form.notes || 'None'}</dd>
                </div>
              </dl>
            </div>
          )}
        </form>
        <footer className="actions">
          <button type="button" onClick={prevStep} disabled={stepIndex === 0}>
            Back
          </button>
          {stepIndex < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep} disabled={stepIndex === 0 ? !(form.name && form.role) : !form.team}>
              Continue
            </button>
          ) : (
            <button type="button" disabled={!allValid}>
              Finish
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}
