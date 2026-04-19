import React, { useEffect, useMemo, useState } from 'react';

/**
 * Problem #69: Maintain timer state during page navigation
 *
 * Detailed Problem Statement:
 * Create timer that persists across route changes (e.g., using localStorage).
 *
 * Example Input:
 * Start timer at 120s, navigate away, return
 *
 * Example Output:
 * Timer resumes from stored remaining time
 */

export const problem = 'Maintain timer state during page navigation';

export const statement = `
Create timer that persists across route changes (e.g., using localStorage).
`.trim();

export const exampleInput = `
Start timer at 120s, navigate away, return
`.trim();

export const exampleOutput = `
Timer resumes from stored remaining time
`.trim();

// Approach 1: Persist remaining seconds directly
export function TimerSolution1({ initial = 120, storageKey = 'timer-remaining' }) {
  const [remaining, setRemaining] = useState(() => Number(localStorage.getItem(storageKey) || initial));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => {
        const next = Math.max(0, prev - 1);
        localStorage.setItem(storageKey, String(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [storageKey]);

  return <p>Remaining: {remaining}s</p>;
}

// Approach 2: Persist absolute deadline timestamp
export function TimerSolution2({ initial = 120, storageKey = 'timer-deadline' }) {
  const [deadline] = useState(() => {
    const saved = Number(localStorage.getItem(storageKey));
    if (saved && saved > Date.now()) return saved;

    const next = Date.now() + initial * 1000;
    localStorage.setItem(storageKey, String(next));
    return next;
  });

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = useMemo(() => Math.max(0, Math.ceil((deadline - now) / 1000)), [deadline, now]);

  return <p>Remaining (deadline): {remaining}s</p>;
}

// Approach 3: Hook abstraction reusable across pages
export function usePersistentTimer(initial = 90, storageKey = 'timer-hook') {
  const [remaining, setRemaining] = useState(() => Number(localStorage.getItem(storageKey) || initial));

  useEffect(() => {
    localStorage.setItem(storageKey, String(remaining));
  }, [remaining, storageKey]);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const reset = () => setRemaining(initial);

  return { remaining, reset };
}

export function TimerSolution3() {
  const timer = usePersistentTimer(75);

  return (
    <div>
      <p>Hook timer: {timer.remaining}s</p>
      <button onClick={timer.reset}>Reset</button>
    </div>
  );
}

export default TimerSolution1;
