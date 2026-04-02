import * as React from "react";
import { KeyValueStore } from "./KeyValueStore.js";

const store = new KeyValueStore({ theme: "light", locale: "en-IN" });

export function StoreDemo() {
  const [entries, setEntries] = React.useState(Object.entries(store.state));
  const [log, setLog] = React.useState([]);
  const keyRef = React.useRef();
  const valueRef = React.useRef();

  React.useEffect(() => {
    const unsubscribe = store.on("*", (change) => {
      setEntries(Object.entries(store.state));
      setLog((entries) => [
        { id: crypto.randomUUID(), change, time: new Date() },
        ...entries,
      ]);
    });
    return unsubscribe;
  }, []);

  const handleSet = (event) => {
    event.preventDefault();
    const key = keyRef.current.value.trim();
    if (!key) return;
    const value = valueRef.current.value;
    store.set(key, value);
    keyRef.current.value = "";
    valueRef.current.value = "";
  };

  return (
    <div className="kv-app">
      <header>
        <h1>Event-Driven Key-Value Store</h1>
        <p>Set, get, delete values and subscribe to changes. A mini reactive data layer.</p>
      </header>

      <section className="card form-card">
        <form onSubmit={handleSet} className="form">
          <input ref={keyRef} placeholder="key" />
          <input ref={valueRef} placeholder="value" />
          <button type="submit">Set value</button>
        </form>
        <button type="button" onClick={() => store.delete(prompt("Key to delete:") || "")}>
          Delete key
        </button>
      </section>

      <section className="card state-card">
        <h2>Current state</h2>
        <ul>
          {entries.map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong> = <code>{String(value)}</code>
            </li>
          ))}
        </ul>
        {!entries.length && <p>No keys stored.</p>}
      </section>

      <section className="card log-card">
        <h2>Log</h2>
        <ul>
          {log.map((entry) => (
            <li key={entry.id}>
              <time>{entry.time.toLocaleTimeString()}</time>
              <span>
                {entry.change.key} → {String(entry.change.value)} (prev: {String(entry.change.previous)})
              </span>
            </li>
          ))}
        </ul>
        {!log.length && <p>No change events yet.</p>}
      </section>
    </div>
  );
}
