# Scheduling App Concept Guide

## Concept Overview
A scheduling application manages calendars, recurring events, and notifications. Core responsibilities include time-zone aware storage, conflict detection, reminders, and synchronization across devices. Modern systems integrate with standards like iCalendar (RFC 5545) and CalDAV, and expose APIs for third-party integrations.

## Real-World Usage
- **Google Calendar / Microsoft Outlook:** Provide shared calendars, conferencing integration, and resource booking.
- **Project Management Tools:** Asana and Trello trigger due-date reminders and workload visualizations.
- **Healthcare Scheduling:** Appointment apps coordinate providers, rooms, and patient reminders with HIPAA-compliant messaging.

## Architecture Highlights
1. **Data Model:** Events capture start/end, recurrence rules (RRULE), attendees, and metadata such as location or conferencing links.
2. **Time Zones:** Store timestamps in UTC and convert on display; use Olson/IANA database to handle daylight savings transitions.
3. **Conflict Detection:** Evaluate overlapping intervals per attendee/resource and propose alternatives.
4. **Notifications:** Background workers send email/push reminders and update ICS feeds when events change.

## Included Working Example (Node.js)
The `example.js` script provides a terminal-based scheduler backed by SQLite. Install dependencies once:

```bash
npm install better-sqlite3 luxon
```

Commands:

```bash
node example.js migrate
node example.js add --title "Team Sync" --start 2026-04-03T09:00 --duration 45 --timezone Asia/Kolkata
node example.js list --days 7
node example.js export-ics --output calendar.ics
```

It normalizes timestamps to UTC, computes conflicts, and can export upcoming events to an iCalendar file for import into desktop calendars.

## React 19 Interactive Demo
`example.jsx` implements an in-browser scheduler using Luxon for time-zone handling:

```jsx
import SchedulingAppDemo from "./scheduling-app/example.jsx";

export default function App() {
  return <SchedulingAppDemo />;
}
```

The component allows users to compose events, converts them to UTC, and lists upcoming meetings without requiring a backend.

## Learning Checklist
- Add recurring events via RFC 5545 RRULE parsing (e.g., `FREQ=WEEKLY;BYDAY=MO`).
- Integrate with a message queue to send email reminders.
- Provide OAuth-based sync with Google Calendar or Microsoft Graph.

## References
- RFC 5545 – Internet Calendaring and Scheduling Core Object Specification: https://www.rfc-editor.org/rfc/rfc5545
- CalDAV Protocol (RFC 4791): https://www.rfc-editor.org/rfc/rfc4791
- Google Calendar API Documentation: https://developers.google.com/calendar/api
