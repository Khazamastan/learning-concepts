import React, { useEffect, useMemo, useState } from 'react';

/**
 * Problem #66: usePageVisits() hook
 *
 * Detailed Problem Statement:
 * Track route/page visits in React app.
 *
 * Example Input:
 * Navigate: /home -> /products -> /home
 *
 * Example Output:
 * { '/home': 2, '/products': 1 }
 */

export const problem = 'usePageVisits() hook';

export const statement = `
Track route/page visits in React app.
`.trim();

export const exampleInput = `
Navigate: /home -> /products -> /home
`.trim();

export const exampleOutput = `
{ '/home': 2, '/products': 1 }
`.trim();

// Approach 1: In-memory visit count
export function usePageVisitsSolution1(pathname) {
  const [visits, setVisits] = useState({});

  useEffect(() => {
    setVisits((prev) => ({ ...prev, [pathname]: (prev[pathname] || 0) + 1 }));
  }, [pathname]);

  return visits;
}

// Approach 2: SessionStorage persisted visits
export function usePageVisitsSolution2(pathname) {
  const [visits, setVisits] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('page-visits') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    setVisits((prev) => {
      const next = { ...prev, [pathname]: (prev[pathname] || 0) + 1 };
      sessionStorage.setItem('page-visits', JSON.stringify(next));
      return next;
    });
  }, [pathname]);

  return visits;
}

// Approach 3: Visit hook with analytics callback
export function usePageVisitsSolution3(pathname, onVisit) {
  const [visits, setVisits] = useState({});

  useEffect(() => {
    setVisits((prev) => {
      const count = (prev[pathname] || 0) + 1;
      onVisit?.({ pathname, count, ts: Date.now() });
      return { ...prev, [pathname]: count };
    });
  }, [pathname, onVisit]);

  return useMemo(() => visits, [visits]);
}

export function PageVisitsDemo() {
  const [path, setPath] = useState('/home');
  const visits = usePageVisitsSolution1(path);

  return (
    <section>
      <h3>Page Visits Demo</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        {['/home', '/products', '/profile'].map((p) => (
          <button key={p} onClick={() => setPath(p)}>
            Go {p}
          </button>
        ))}
      </div>
      <p>Current Path: {path}</p>
      <pre>{JSON.stringify(visits, null, 2)}</pre>
    </section>
  );
}

export default PageVisitsDemo;
