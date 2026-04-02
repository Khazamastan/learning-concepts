import React, { useEffect, useRef, useState } from 'react';

async function fetchMetrics() {
  const response = await fetch('/api/metrics');
  if (!response.ok) {
    throw new Error('Failed to load metrics');
  }
  return response.json();
}

function shallowEqualMetrics(a, b) {
  if (!a || !b) {
    return false;
  }

  return (
    a.requests === b.requests &&
    a.latencyMs === b.latencyMs &&
    a.errors === b.errors
  );
}

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState(null);
  const previousRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const next = await fetchMetrics();
        if (!cancelled && !shallowEqualMetrics(previousRef.current, next)) {
          previousRef.current = next;
          setMetrics(next);
        }
      } catch (error) {
        console.error('Metrics fetch failed', error);
      } finally {
        if (!cancelled) {
          timeoutRef.current = window.setTimeout(load, 30 * 60 * 1000);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!metrics) {
    return <p>Loading metrics…</p>;
  }

  return (
    <section>
      <h3>Metrics (30 min refresh)</h3>
      <p>Requests: {metrics.requests}</p>
      <p>Latency: {metrics.latencyMs} ms</p>
      <p>Errors: {metrics.errors}</p>
    </section>
  );
}
