import React, { useState } from 'react';

/**
 * Problem #67: Switch-Case component in React
 *
 * Detailed Problem Statement:
 * Build component that renders different UI blocks based on value.
 *
 * Example Input:
 * <SwitchCase value="loading" cases={{ loading: <p>Loading</p>, done: <p>Done</p> }} defaultCase={<p>NA</p>} />
 *
 * Example Output:
 * Renders: Loading
 */

export const problem = 'Switch-Case component in React';

export const statement = `
Build component that renders different UI blocks based on value.
`.trim();

export const exampleInput = `
<SwitchCase value="loading" cases={{ loading: <p>Loading</p>, done: <p>Done</p> }} defaultCase={<p>NA</p>} />
`.trim();

export const exampleOutput = `
Renders: Loading
`.trim();

// Approach 1: Object map based switch-case
export function SwitchCaseSolution1({ value, cases, defaultCase = null }) {
  return cases[value] ?? defaultCase;
}

// Approach 2: Declarative <When> children API
export function When({ is, children }) {
  return is ? children : null;
}

export function SwitchCaseSolution2({ value, children, fallback = null }) {
  const childrenArray = React.Children.toArray(children);
  const match = childrenArray.find((child) => child.props?.value === value);
  return match ?? fallback;
}

// Approach 3: Function resolver API
export function SwitchCaseSolution3({ value, resolver, fallback = null }) {
  if (typeof resolver !== 'function') return fallback;
  const node = resolver(value);
  return node ?? fallback;
}

export function SwitchCaseDemo() {
  const [status, setStatus] = useState('loading');

  return (
    <section>
      <h3>Switch-Case Demo</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        {['loading', 'done', 'error'].map((s) => (
          <button key={s} onClick={() => setStatus(s)}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <SwitchCaseSolution1
          value={status}
          cases={{
            loading: <p>Loading...</p>,
            done: <p>Done!</p>,
            error: <p>Something went wrong.</p>
          }}
          defaultCase={<p>Unknown</p>}
        />
      </div>
    </section>
  );
}

export default SwitchCaseDemo;
