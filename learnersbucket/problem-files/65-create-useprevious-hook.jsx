import React, { useEffect, useRef, useState } from 'react';

/**
 * Problem #65: Create usePrevious() hook
 *
 * Detailed Problem Statement:
 * Create React hook that returns previous render value.
 *
 * Example Input:
 * const prevCount = usePrevious(count)
 *
 * Example Output:
 * When count becomes 5, prevCount is 4
 */

export const problem = 'Create usePrevious() hook';

export const statement = `
Create React hook that returns previous render value.
`.trim();

export const exampleInput = `
const prevCount = usePrevious(count)
`.trim();

export const exampleOutput = `
When count becomes 5, prevCount is 4
`.trim();

// Approach 1: Classic useRef + useEffect
export function usePreviousSolution1(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Approach 2: usePrevious with explicit initial fallback
export function usePreviousSolution2(value, initialValue = null) {
  const ref = useRef(initialValue);
  const previous = ref.current;

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return previous;
}

// Approach 3: Keep last N previous values
export function usePreviousSolution3(value, limit = 3) {
  const ref = useRef([]);

  useEffect(() => {
    ref.current = [value, ...ref.current].slice(0, limit);
  }, [value, limit]);

  return ref.current.slice(1);
}

export function UsePreviousDemo() {
  const [count, setCount] = useState(0);
  const prev = usePreviousSolution1(count);
  const history = usePreviousSolution3(count, 4);

  return (
    <section>
      <h3>usePrevious Demo</h3>
      <p>
        Current: {count} | Previous: {String(prev)}
      </p>
      <p>History: {history.join(' <- ') || 'none'}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </section>
  );
}

export default UsePreviousDemo;
