import * as React from "react";
import {
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";

const SAMPLE_EVENTS = [
  {
    id: "1",
    title: "Sprint planning",
    start: "2026-04-04T10:00:00",
    end: "2026-04-04T11:00:00",
    color: "#38bdf8",
  },
  {
    id: "2",
    title: "Design sync",
    start: "2026-04-07T14:00:00",
    end: "2026-04-07T15:00:00",
    color: "#a855f7",
  },
  {
    id: "3",
    title: "Lunch and learn",
    start: "2026-04-12T12:00:00",
    end: "2026-04-12T13:00:00",
    color: "#f97316",
  },
  {
    id: "4",
    title: "Product launch",
    start: "2026-04-18T09:00:00",
    end: "2026-04-18T11:00:00",
    color: "#22c55e",
  },
];

export function CalendarApp() {
  const [referenceDate, setReferenceDate] = React.useState(() => new Date());
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());

  const monthStart = startOfMonth(referenceDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(addMonths(gridStart, 1), { weekStartsOn: 0 });

  const days = [];
  let cursor = gridStart;
  while (cursor <= gridEnd) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  const eventsByDay = React.useMemo(() => {
    const map = new Map();
    for (const event of SAMPLE_EVENTS) {
      const dayKey = format(parseISO(event.start), "yyyy-MM-dd");
      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
      map.get(dayKey).push(event);
    }
    return map;
  }, []);

  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const selectedEvents = eventsByDay.get(selectedKey) ?? [];

  return (
    <div className="calendar-app">
      <header className="calendar-header">
        <div>
          <button type="button" className="nav-button" onClick={() => setReferenceDate((d) => addMonths(d, -1))}>
            ◀
          </button>
          <button type="button" className="nav-button" onClick={() => setReferenceDate(new Date())}>
            Today
          </button>
          <button type="button" className="nav-button" onClick={() => setReferenceDate((d) => addMonths(d, 1))}>
            ▶
          </button>
        </div>
        <h1>{format(referenceDate, "MMMM yyyy")}</h1>
      </header>
      <div className="calendar-body">
        <div className="month-grid" role="grid" aria-label="Month view">
          <div className="weekday-row" role="row">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} role="columnheader" className="weekday-cell">
                {format(addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), idx), "EEE")}
              </div>
            ))}
          </div>
          <div className="day-grid">
            {days.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const events = eventsByDay.get(key) ?? [];
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              return (
                <button
                  type="button"
                  key={key}
                  role="gridcell"
                  className={`day-cell${isCurrentMonth ? "" : " day-cell--muted"}${
                    isSelected ? " day-cell--selected" : ""
                  }${isToday ? " day-cell--today" : ""}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className="day-number">{format(day, "d")}</span>
                  <div className="event-dots">
                    {events.slice(0, 3).map((event) => (
                      <span key={event.id} className="event-dot" style={{ backgroundColor: event.color }} />
                    ))}
                    {events.length > 3 ? <span className="event-overflow">+{events.length - 3}</span> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <aside className="event-panel">
          <h2>{format(selectedDate, "EEEE, MMM d")}</h2>
          {selectedEvents.length === 0 ? (
            <p className="empty">No events planned.</p>
          ) : (
            <ul>
              {selectedEvents.map((event) => (
                <li key={event.id} className="event-card" style={{ borderLeftColor: event.color }}>
                  <span className="event-time">
                    {format(parseISO(event.start), "h:mm a")} – {format(parseISO(event.end), "h:mm a")}
                  </span>
                  <span className="event-title">{event.title}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
