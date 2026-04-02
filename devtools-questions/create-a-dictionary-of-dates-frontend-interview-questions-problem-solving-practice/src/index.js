export function createDateDictionary(events) {
  return events.reduce((acc, event) => {
    const dateKey = new Date(event.date).toISOString().slice(0, 10);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {});
}

const sample = [
  { id: 1, title: "Standup", date: "2026-04-03T09:00:00+05:30" },
  { id: 2, title: "Design review", date: "2026-04-03T13:00:00+05:30" },
  { id: 3, title: "Release planning", date: "2026-04-04T10:00:00+05:30" },
  { id: 4, title: "Retro", date: "2026-04-04T16:00:00+05:30" },
  { id: 5, title: "Skip-level", date: "2026-04-05T11:30:00+05:30" },
];

console.log(createDateDictionary(sample));
