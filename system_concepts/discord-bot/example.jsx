import { useState } from "react";

const initialEvents = [
  { id: "READY", description: "Gateway READY event received" },
  { id: "GUILD_CREATE", description: "Guild cache hydrated" },
];

export default function DiscordBotDemo() {
  const [events, setEvents] = useState(initialEvents);
  const [commandResponse, setCommandResponse] = useState(null);

  function handlePing() {
    const latency = Math.floor(Math.random() * 120) + 20;
    setCommandResponse(`Pong! ${latency} ms`);
    appendEvent("INTERACTION_CREATE", "Slash command /ping invoked");
  }

  function appendEvent(type, description) {
    setEvents((current) => [
      ...current,
      { id: `${type}-${crypto.randomUUID()}`, type, description },
    ]);
  }

  function simulateMessage() {
    appendEvent(
      "MESSAGE_CREATE",
      "User mentioned bot → respond with helper message"
    );
  }

  return (
    <div className="panel">
      <h2>Discord Bot Lifecycle</h2>
      <section>
        <h3>Gateway Events</h3>
        <ol>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.type ?? event.id}</strong> — {event.description}
            </li>
          ))}
        </ol>
      </section>
      <div className="button-row">
        <button onClick={handlePing}>/ping</button>
        <button onClick={simulateMessage}>User Mention</button>
      </div>
      {commandResponse && (
        <p>
          <strong>Command Response:</strong> {commandResponse}
        </p>
      )}
    </div>
  );
}
