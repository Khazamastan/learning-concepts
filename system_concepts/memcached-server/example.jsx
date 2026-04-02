import { useMemo, useState } from "react";

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

export default function MemcachedDemo() {
  const store = useMemo(() => new Map(), []);
  const [key, setKey] = useState("counter");
  const [value, setValue] = useState("1");
  const [ttl, setTtl] = useState(60);
  const [log, setLog] = useState([]);

  function append(message) {
    setLog((current) => [
      { id: crypto.randomUUID(), timestamp: new Date(), message },
      ...current.slice(0, 14),
    ]);
  }

  function setItem() {
    const expiry = ttl === 0 ? null : nowSeconds() + Number(ttl);
    store.set(key, { value, expiry });
    append(`STORED ${key} = ${value} (ttl ${ttl}s)`);
    setValue("");
  }

  function getItem() {
    const entry = store.get(key);
    if (!entry) {
      append(`GET ${key} -> (miss)`);
      return;
    }
    if (entry.expiry && entry.expiry < nowSeconds()) {
      store.delete(key);
      append(`GET ${key} -> expired`);
      return;
    }
    append(`GET ${key} -> ${entry.value}`);
  }

  function incr() {
    const entry = store.get(key);
    const number = entry ? Number(entry.value) : 0;
    if (Number.isNaN(number)) {
      append(`INCR ${key} -> ERR non-numeric`);
      return;
    }
    const next = number + 1;
    store.set(key, { value: next.toString(), expiry: entry?.expiry ?? null });
    append(`INCR ${key} -> ${next}`);
  }

  function del() {
    append(`DEL ${key} -> ${store.delete(key) ? 1 : 0}`);
  }

  return (
    <div className="panel">
      <h2>Memcached Simulator</h2>
      <div className="form-grid">
        <label>
          Key
          <input value={key} onChange={(event) => setKey(event.target.value)} />
        </label>
        <label>
          Value
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="42"
          />
        </label>
        <label>
          TTL (seconds, 0 = forever)
          <input
            type="number"
            value={ttl}
            onChange={(event) => setTtl(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="button-row">
        <button onClick={setItem}>set</button>
        <button onClick={getItem}>get</button>
        <button onClick={incr}>incr</button>
        <button onClick={del}>delete</button>
      </div>
      <section>
        <h3>Recent Commands</h3>
        <ol>
          {log.map((entry) => (
            <li key={entry.id}>
              <time dateTime={entry.timestamp.toISOString()}>
                {entry.timestamp.toLocaleTimeString()}
              </time>{" "}
              — {entry.message}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
