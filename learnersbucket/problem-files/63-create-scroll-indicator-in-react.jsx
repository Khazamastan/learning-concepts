import React, { useEffect, useMemo, useState } from 'react';

/**
 * Problem #63: Create scroll indicator in react
 *
 * Detailed Problem Statement:
 * Display reading progress bar based on page scroll.
 *
 * Example Input:
 * User scrolls to middle of document
 *
 * Example Output:
 * Progress bar width ~50%
 */

export const problem = 'Create scroll indicator in react';

export const statement = `
Display reading progress bar based on page scroll.
`.trim();

export const exampleInput = `
User scrolls to middle of document
`.trim();

export const exampleOutput = `
Progress bar width ~50%
`.trim();

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (top / height) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

// Approach 1: Top horizontal bar
export function ScrollIndicatorSolution1() {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 4,
        width: `${progress}%`,
        background: '#20a35b',
        zIndex: 9999
      }}
    />
  );
}

// Approach 2: Circular indicator
export function ScrollIndicatorSolution2() {
  const progress = useScrollProgress();
  const circumference = useMemo(() => 2 * Math.PI * 18, []);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, width: 46, height: 46 }}>
      <svg width="46" height="46" viewBox="0 0 46 46">
        <circle cx="23" cy="23" r="18" stroke="#ddd" strokeWidth="4" fill="none" />
        <circle
          cx="23"
          cy="23"
          r="18"
          stroke="#111"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 23 23)"
        />
      </svg>
      <small style={{ position: 'absolute', top: 14, left: 10 }}>{Math.round(progress)}%</small>
    </div>
  );
}

// Approach 3: Section progress indicator
export function ScrollIndicatorSolution3({ sectionCount = 6 }) {
  const progress = useScrollProgress();
  const active = Math.min(sectionCount - 1, Math.floor((progress / 100) * sectionCount));

  return (
    <div style={{ position: 'fixed', left: 14, top: '35%', display: 'grid', gap: 8 }}>
      {Array.from({ length: sectionCount }).map((_, idx) => (
        <div
          key={idx}
          style={{
            width: 8,
            height: 24,
            borderRadius: 10,
            background: idx <= active ? '#111' : '#ddd'
          }}
        />
      ))}
    </div>
  );
}

export default ScrollIndicatorSolution1;
