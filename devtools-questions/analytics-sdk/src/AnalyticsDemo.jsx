import * as React from "react";
import { AnalyticsSDK } from "./AnalyticsSDK.js";

function mockFetch(url, options) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock send:", url, JSON.parse(options.body));
      resolve({ ok: true });
    }, 300);
  });
}

const analytics = new AnalyticsSDK({ endpoint: "/analytics", flushInterval: 4000, fetchImpl: mockFetch });

export function AnalyticsDemo() {
  const [log, setLog] = React.useState([]);
  const [eventName, setEventName] = React.useState("button_click");
  const [property, setProperty] = React.useState("CTA");

  React.useEffect(() => {
    const originalTrack = analytics.track.bind(analytics);
    analytics.track = (event, props) => {
      originalTrack(event, props);
      setLog((entries) => [
        { id: crypto.randomUUID(), event, props, time: new Date() },
        ...entries,
      ]);
    };

    return () => analytics.stop();
  }, []);

  const handleTrack = () => {
    analytics.track(eventName, { label: property });
  };

  return (
    <div className="analytics-app">
      <header>
        <h1>Analytics SDK in JavaScript</h1>
        <p>Queue events, batch flush, and send to an endpoint. This demo uses a mock `fetch` to display payloads.</p>
      </header>
      <section className="card">
        <label>
          Event name
          <input value={eventName} onChange={(event) => setEventName(event.target.value)} />
        </label>
        <label>
          Label
          <input value={property} onChange={(event) => setProperty(event.target.value)} />
        </label>
        <button type="button" onClick={handleTrack}>
          Track event
        </button>
        <p className="hint">Events flush automatically every 4 seconds or when 10 events accumulate.</p>
      </section>

      <section className="card log-card">
        <h2>Queued Events</h2>
        <ul>
          {log.map((entry) => (
            <li key={entry.id}>
              <time>{entry.time.toLocaleTimeString()}</time>
              <span>
                {entry.event} – {JSON.stringify(entry.props)}
              </span>
            </li>
          ))}
        </ul>
        {!log.length && <p>No events tracked yet.</p>}
      </section>
    </div>
  );
}
