import { useState } from 'react';
import './styles.css';

const ROOMS = ['Orion', 'Pegasus', 'Apollo', 'Nova'];

export default function App() {
  const [form, setForm] = useState({ name: '', room: ROOMS[0], date: '', time: '09:00' });
  const [reservations, setReservations] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.date) return;
    setReservations((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...form }
    ]);
    setForm((prev) => ({ ...prev, name: '', date: '' }));
  };

  const removeReservation = (id) => {
    setReservations((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="reservation">
      <header>
        <h1>Room Reservation</h1>
        <p>Book meeting rooms and view upcoming reservations.</p>
      </header>
      <div className="reservation__layout">
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Your name"
            />
          </label>
          <label>
            Room
            <select
              value={form.room}
              onChange={(event) => setForm((prev) => ({ ...prev, room: event.target.value }))}
            >
              {ROOMS.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            />
          </label>
          <label>
            Time
            <input
              type="time"
              value={form.time}
              onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
            />
          </label>
          <button type="submit">Add reservation</button>
        </form>
        <section className="reservation__list">
          {reservations.length === 0 && <p>No reservations yet. Add one using the form.</p>}
          {reservations.map((entry) => (
            <article key={entry.id}>
              <h2>{entry.room}</h2>
              <p>
                {entry.date} at {entry.time}
              </p>
              <p>Host: {entry.name}</p>
              <button type="button" onClick={() => removeReservation(entry.id)}>
                Remove
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
