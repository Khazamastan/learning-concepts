import { useMemo, useState } from "react";
import { DateTime } from "luxon";

export default function SchedulingAppDemo() {
  const [title, setTitle] = useState("Team Sync");
  const [start, setStart] = useState(DateTime.local().toISO({ suppressSeconds: true }));
  const [duration, setDuration] = useState(45);
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [events, setEvents] = useState([]);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) => a.startUtc.valueOf() - b.startUtc.valueOf()
      ),
    [events]
  );

  function addEvent(event) {
    setEvents((current) => [...current, event]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const startDate = DateTime.fromISO(start, { zone: timezone });
    if (!startDate.isValid) return;
    const endDate = startDate.plus({ minutes: Number(duration) });
    addEvent({
      id: crypto.randomUUID(),
      title,
      startLocal: startDate,
      endLocal: endDate,
      startUtc: startDate.toUTC(),
      endUtc: endDate.toUTC(),
      timezone,
    });
  }

  return (
    <div className="panel">
      <h2>Scheduling App (Client Simulation)</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Start
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          Duration (minutes)
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label>
          Time Zone
          <input
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </label>
        <button type="submit">Add Event</button>
      </form>
      <section>
        <h3>Upcoming Events</h3>
        {sortedEvents.length === 0 ? (
          <p>No events scheduled.</p>
        ) : (
          <ul>
            {sortedEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> —{" "}
                {event.startLocal.toFormat("yyyy-LL-dd HH:mm")} to{" "}
                {event.endLocal.toFormat("HH:mm")} ({event.timezone})
                <div className="muted">
                  UTC: {event.startUtc.toISO()} – {event.endUtc.toISO()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
