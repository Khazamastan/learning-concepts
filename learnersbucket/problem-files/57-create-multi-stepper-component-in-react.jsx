import React, { useMemo, useReducer, useState } from 'react';

/**
 * Problem #57: Create Multi-Stepper component in React
 *
 * Detailed Problem Statement:
 * Build a reusable stepper with:
 * - current step tracking
 * - next/previous navigation
 * - completion status
 *
 * Example Input:
 * const steps = ['Profile', 'Address', 'Payment'];
 *
 * Example Output:
 * Step 1/3 -> Next -> Step 2/3
 */

export const problem = 'Create Multi-Stepper component in React';

export const statement = `
Build a reusable stepper with:
- current step tracking
- next/previous navigation
- completion status
`.trim();

export const exampleInput = `
const steps = ['Profile', 'Address', 'Payment'];
`.trim();

export const exampleOutput = `
Step 1/3 -> Next -> Step 2/3
`.trim();

// Approach 1: Simple state-driven stepper
export function StepperSolution1({ steps = ['Profile', 'Address', 'Payment'] }) {
  const [active, setActive] = useState(0);
  const isLast = active === steps.length - 1;

  return (
    <section>
      <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0 }}>
        {steps.map((step, idx) => (
          <li
            key={step}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #ccc',
              background: idx === active ? '#111' : idx < active ? '#e6ffe6' : '#fff',
              color: idx === active ? '#fff' : '#222'
            }}
          >
            {idx + 1}. {step}
          </li>
        ))}
      </ol>

      <div style={{ marginTop: 14 }}>
        <h3>{steps[active]}</h3>
        <p>
          Step {active + 1} of {steps.length}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setActive((s) => Math.max(0, s - 1))} disabled={active === 0}>
          Previous
        </button>
        <button onClick={() => setActive((s) => Math.min(steps.length - 1, s + 1))} disabled={isLast}>
          Next
        </button>
      </div>
    </section>
  );
}

// Approach 2: useReducer + guarded transitions
function stepperReducer(state, action) {
  switch (action.type) {
    case 'NEXT':
      return { ...state, active: Math.min(state.active + 1, state.total - 1) };
    case 'PREV':
      return { ...state, active: Math.max(state.active - 1, 0) };
    case 'JUMP':
      return { ...state, active: Math.max(0, Math.min(action.index, state.total - 1)) };
    default:
      return state;
  }
}

export function StepperSolution2({ steps = ['Profile', 'Address', 'Payment', 'Review'] }) {
  const [state, dispatch] = useReducer(stepperReducer, { active: 0, total: steps.length });

  return (
    <section>
      <div style={{ display: 'grid', gap: 10 }}>
        {steps.map((step, idx) => (
          <button
            key={step}
            type="button"
            onClick={() => dispatch({ type: 'JUMP', index: idx })}
            style={{
              textAlign: 'left',
              border: '1px solid #ddd',
              borderLeft: idx === state.active ? '4px solid #111' : '4px solid transparent',
              padding: '8px 10px',
              background: idx <= state.active ? '#f6f6f6' : '#fff'
            }}
          >
            {idx + 1}. {step}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => dispatch({ type: 'PREV' })} disabled={state.active === 0}>
          Previous
        </button>
        <button onClick={() => dispatch({ type: 'NEXT' })} disabled={state.active === steps.length - 1}>
          Next
        </button>
      </div>
    </section>
  );
}

// Approach 3: Controlled/uncontrolled hybrid
export function StepperSolution3({
  steps = ['Profile', 'Address', 'Payment'],
  value,
  onChange
}) {
  const [internal, setInternal] = useState(0);
  const active = value ?? internal;
  const setActive = onChange ?? setInternal;

  const status = useMemo(
    () => steps.map((_, i) => (i < active ? 'done' : i === active ? 'active' : 'pending')),
    [steps, active]
  );

  return (
    <section>
      <ul style={{ display: 'flex', gap: 10, listStyle: 'none', padding: 0 }}>
        {steps.map((step, idx) => (
          <li key={step}>
            <button
              type="button"
              onClick={() => setActive(idx)}
              style={{
                borderRadius: 999,
                border: '1px solid #222',
                padding: '6px 12px',
                background:
                  status[idx] === 'done' ? '#e6ffe6' : status[idx] === 'active' ? '#222' : '#fff',
                color: status[idx] === 'active' ? '#fff' : '#111'
              }}
            >
              {step}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>
          Back
        </button>
        <button
          onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
          disabled={active === steps.length - 1}
          style={{ marginLeft: 8 }}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

export default StepperSolution1;
