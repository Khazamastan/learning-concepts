// Console scheduling app with SQLite storage and ICS export (Node.js).
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { DateTime } = require('luxon');

const DB_PATH = path.join(process.cwd(), 'schedule.db');
const SCHEMA = `
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  start_utc TEXT NOT NULL,
  end_utc TEXT NOT NULL,
  timezone TEXT NOT NULL,
  location TEXT
);
`;

function connect() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  return db;
}

function parseIsoWithZone(timestamp, zone, durationMinutes) {
  let start = DateTime.fromISO(timestamp, { zone });
  if (!start.isValid) throw new Error(`Invalid timestamp: ${timestamp}`);
  const end = start.plus({ minutes: durationMinutes });
  return {
    startUtc: start.toUTC().toISO(),
    endUtc: end.toUTC().toISO(),
    start,
    end,
  };
}

function cmdMigrate() {
  const db = connect();
  db.exec(SCHEMA);
  console.log('Database schema ensured at', DB_PATH);
  db.close();
}

function cmdAdd(args) {
  const { title, start, duration = 60, timezone = 'UTC', location } = args;
  if (!title || !start) throw new Error('add requires --title and --start');
  const durationMinutes = Number(duration);
  const { startUtc, endUtc } = parseIsoWithZone(start, timezone, durationMinutes);
  const uid = `${start}-${title}`.replace(/\s+/g, '_');

  const db = connect();
  const stmt = db.prepare(
    `INSERT OR REPLACE INTO events (uid, title, start_utc, end_utc, timezone, location)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  stmt.run(uid, title, startUtc, endUtc, timezone, location || null);
  console.log(`Stored event '${title}' starting at ${startUtc}`);
  db.close();
}

function cmdList(args) {
  const days = Number(args.days || 7);
  const now = DateTime.utc();
  const horizon = now.plus({ days });

  const db = connect();
  const stmt = db.prepare(
    `SELECT * FROM events WHERE start_utc BETWEEN ? AND ? ORDER BY start_utc`
  );
  const rows = stmt.all(now.toISO(), horizon.toISO());
  db.close();

  if (rows.length === 0) {
    console.log('No upcoming events');
    return;
  }

  rows.forEach((row) => {
    const start = DateTime.fromISO(row.start_utc).setZone(row.timezone);
    const end = DateTime.fromISO(row.end_utc).setZone(row.timezone);
    console.log(`- ${row.title} | ${start.toFormat('yyyy-LL-dd HH:mm')} - ${end.toFormat('HH:mm')} (${row.timezone})`);
    if (row.location) console.log(`    Location: ${row.location}`);
  });
}

function generateICS(events) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mini Scheduler//EN',
  ];
  events.forEach((row) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${row.uid}`,
      `DTSTAMP:${DateTime.utc().toFormat("yyyyLLdd'T'HHmmss'Z'")}`,
      `DTSTART:${DateTime.fromISO(row.start_utc).toFormat("yyyyLLdd'T'HHmmss'Z'")}`,
      `DTEND:${DateTime.fromISO(row.end_utc).toFormat("yyyyLLdd'T'HHmmss'Z'")}`,
      `SUMMARY:${row.title}`
    );
    if (row.location) lines.push(`LOCATION:${row.location}`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return `${lines.join('\r\n')}\r\n`;
}

function cmdExport(args) {
  if (!args.output) throw new Error('export-ics requires --output');
  const db = connect();
  const rows = db.prepare('SELECT * FROM events ORDER BY start_utc').all();
  db.close();
  if (rows.length === 0) {
    console.log('No events to export');
    return;
  }
  const content = generateICS(rows);
  fs.writeFileSync(args.output, content, 'utf8');
  console.log(`Exported ${rows.length} events to ${path.resolve(args.output)}`);
}

function parseArguments(argv) {
  const [command, ...rest] = argv.slice(2);
  const args = {};
  rest.forEach((item, index) => {
    if (item.startsWith('--')) {
      const key = item.slice(2);
      const value = rest[index + 1] && !rest[index + 1].startsWith('--')
        ? rest[index + 1]
        : true;
      args[key] = value;
    }
  });
  args.command = command;
  return args;
}

function main() {
  const args = parseArguments(process.argv);
  try {
    switch (args.command) {
      case 'migrate':
        cmdMigrate();
        break;
      case 'add':
        cmdAdd(args);
        break;
      case 'list':
        cmdList(args);
        break;
      case 'export-ics':
        cmdExport(args);
        break;
      default:
        console.log(`Usage:
  node example.js migrate
  node example.js add --title "Team Sync" --start 2026-04-03T09:00 --timezone Asia/Kolkata --duration 45
  node example.js list --days 7
  node example.js export-ics --output calendar.ics`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

if (require.main === module) {
  main();
}
