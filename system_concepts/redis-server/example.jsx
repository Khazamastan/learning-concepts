import { useMemo, useState } from "react";

export default function RedisServerDemo() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const store = useMemo(() => new Map(), []);
  const [log, setLog] = useState([]);

  function appendLog(entry) {
    setLog((current) => [
      { id: crypto.randomUUID(), timestamp: new Date(), entry },
      ...current,
    ]);
  }

  function handleSet() {
    if (!key) return;
    store.set(key, value);
    appendLog(`SET ${key} = ${value}`);
    setValue("");
  }

  function handleGet() {
    if (!key) return;
    const result = store.has(key) ? store.get(key) : "(nil)";
    appendLog(`GET ${key} -> ${result}`);
  }

  function handleIncr() {
    if (!key) return;
    const current = Number(store.get(key) ?? "0");
    if (Number.isNaN(current)) {
      appendLog(`INCR ${key} -> ERR value is not an integer`);
      return;
    }
    const next = current + 1;
    store.set(key, next.toString());
    appendLog(`INCR ${key} -> ${next}`);
  }

  function handleDel() {
    if (!key) return;
    const deleted = store.delete(key) ? 1 : 0;
    appendLog(`DEL ${key} -> ${deleted}`);
  }

  return (
    <div className="panel">
      <h2>Redis Server Simulator</h2>
      <p>
        Experiment with core commands (<code>SET</code>, <code>GET</code>,{" "}
        <code>DEL</code>, <code>INCR</code>) using an in-memory map.
      </p>
      <div className="form-grid">
        <label>
          Key
          <input
            value={key}
            onChange={(event) => setKey(event.target.value)}
            placeholder="counter"
          />
        </label>
        <label>
          Value
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="42"
          />
        </label>
      </div>
      <div className="button-row">
        <button onClick={handleSet}>SET</button>
        <button onClick={handleGet}>GET</button>
        <button onClick={handleIncr}>INCR</button>
        <button onClick={handleDel}>DEL</button>
      </div>
      <section aria-label="command log">
        <h3>Command Log</h3>
        <ol>
          {log.map(({ id, timestamp, entry }) => (
            <li key={id}>
              <time dateTime={timestamp.toISOString()}>
                {timestamp.toLocaleTimeString()}
              </time>{" "}
              — {entry}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
