'use client';

import React, { useMemo, useState } from 'react';

function parseLogEntry(entry) {
  const [userId, timestampText, action] = entry.trim().split(/\s+/);
  return { userId, timestamp: Number(timestampText), action };
}

function findSessionsWithinSpan(logs, spanLimit) {
  const sessions = [];
  const active = new Map();

  logs
    .map(parseLogEntry)
    .filter(({ userId, timestamp, action }) => userId && Number.isFinite(timestamp) && action)
    .forEach((entry) => {
      if (entry.action === 'sign-in') {
        active.set(entry.userId, entry.timestamp);
      } else if (entry.action === 'sign-out' && active.has(entry.userId)) {
        const start = active.get(entry.userId);
        const duration = entry.timestamp - start;
        sessions.push({
          userId: entry.userId,
          start,
          end: entry.timestamp,
          duration,
          withinSpan: duration <= spanLimit,
        });
        active.delete(entry.userId);
      }
    });

  return sessions;
}

export function ProcessLogsMaxSpanDemo() {
  const [logInput, setLogInput] = useState('99 10 sign-in\n99 20 sign-out');
  const [span, setSpan] = useState(10);

  const sessions = useMemo(() => {
    const lines = logInput.split(/\n+/).filter(Boolean);
    return findSessionsWithinSpan(lines, span);
  }, [logInput, span]);

  return (
    <section>
      <h2>Process Logs Max Span</h2>
      <label>
        Logs
        <textarea value={logInput} onChange={(event) => setLogInput(event.target.value)} rows={4} />
      </label>
      <label>
        Max span (seconds)
        <input
          type="number"
          value={span}
          onChange={(event) => setSpan(Number(event.target.value) || 0)}
        />
      </label>
      <pre>{JSON.stringify(sessions, null, 2)}</pre>
    </section>
  );
}
