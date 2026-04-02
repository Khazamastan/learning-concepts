'use client';

import React, { useEffect, useEffectEvent, useRef, useState } from 'react';

async function fetchMetrics() {
  const response = await fetch('/api/metrics', { cache: 'no-store' });
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

  const scheduleLoad = useEffectEvent(async () => {
    try {
      const next = await fetchMetrics();
      if (!shallowEqualMetrics(previousRef.current, next)) {
        previousRef.current = next;
        setMetrics(next);
      }
    } catch (error) {
      console.error('Metrics fetch failed', error);
    } finally {
      timeoutRef.current = window.setTimeout(scheduleLoad, 30 * 60 * 1000);
    }
  });

  useEffect(() => {
    scheduleLoad();
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [scheduleLoad]);

  if (!metrics) {
    return <p>Loading metrics…</p>;
  }

  return (
    <section>
      <h3>Metrics (React 19, 30 min refresh)</h3>
      <p>Requests: {metrics.requests}</p>
      <p>Latency: {metrics.latencyMs} ms</p>
      <p>Errors: {metrics.errors}</p>
    </section>
  );
}
