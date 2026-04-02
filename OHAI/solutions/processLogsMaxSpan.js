'use strict';

const logs = ['99 10 sign-in', '99 20 sign-out'];
const maxSpan = 10;

function parseLogEntry(entry) {
  const [userId, timestampText, action] = entry.split(/\s+/);
  return { userId, timestamp: Number(timestampText), action };
}

function findSessionsWithinSpan(logEntries, spanLimit) {
  const activeSessions = new Map(); // userId -> sign-in timestamp
  const sessionsWithinSpan = [];

  for (const entry of logEntries.map(parseLogEntry)) {
    if (entry.action === 'sign-in') {
      activeSessions.set(entry.userId, entry.timestamp);
      continue;
    }
    if (entry.action === 'sign-out' && activeSessions.has(entry.userId)) {
      const startTimestamp = activeSessions.get(entry.userId);
      const duration = entry.timestamp - startTimestamp;
      sessionsWithinSpan.push({
        userId: entry.userId,
        start: startTimestamp,
        end: entry.timestamp,
        duration,
        withinSpan: duration <= spanLimit,
      });
      activeSessions.delete(entry.userId);
    }
  }

  return sessionsWithinSpan;
}

console.log('Sessions:', findSessionsWithinSpan(logs, maxSpan));
