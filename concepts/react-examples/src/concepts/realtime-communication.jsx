import { useEffect, useMemo, useState } from 'react';

const strategies = {
  websocket: {
    label: 'WebSocket',
    description: 'Full-duplex channel ideal for bidirectional chat, multiplayer games, live collaboration.',
    expectedLatency: 40,
    direction: 'bi'
  },
  sse: {
    label: 'Server-Sent Events',
    description: 'One-way text/event-stream over HTTP/1.1. Works well behind proxies; great for dashboards.',
    expectedLatency: 120,
    direction: 'server -> client'
  },
  polling: {
    label: 'Short Polling',
    description: 'Periodic HTTP requests. Easy to implement but wastes connections and increases latency.',
    expectedLatency: 800,
    direction: 'client -> server (periodic)'
  }
};

export default function RealtimeCommunication() {
  const [active, setActive] = useState('websocket');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const id = crypto.randomUUID();
    const timestamp = new Date().toLocaleTimeString();
    setEvents((prev) => [{ id, timestamp, strategy: strategies[active].label }, ...prev].slice(0, 5));
    const interval = setInterval(() => {
      const newEvent = { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString(), strategy: strategies[active].label };
      setEvents((prev) => [newEvent, ...prev].slice(0, 5));
    }, Math.max(strategies[active].expectedLatency * 5, 1200));

    return () => clearInterval(interval);
  }, [active]);

  const hint = useMemo(() => {
    switch (active) {
      case 'websocket':
        return 'Run websocket-server.mjs and websocket-client.mjs to broadcast messages in real time. Inspect frames in your browser devtools.';
      case 'sse':
        return 'Open http://localhost:4100/stream in the browser to see Server-Sent Events streaming every 2 seconds.';
      default:
        return 'Execute polling-client.mjs to observe HTTP polling every 5 seconds against /snapshot.';
    }
  }, [active]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Real-time Delivery Patterns</h2>
      <div className="flex gap-2">
        {Object.entries(strategies).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              key === active ? 'border-indigo-400 bg-indigo-500/10 text-indigo-100' : 'border-white/10 text-slate-300 hover:border-indigo-400/50'
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-300">{strategies[active].description}</p>
      <dl className="grid gap-2 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Latency Target (ms)</dt>
          <dd className="text-xl font-semibold text-indigo-200">{strategies[active].expectedLatency}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Directionality</dt>
          <dd className="text-sm text-slate-100">{strategies[active].direction}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Demo Script</dt>
          <dd className="text-sm text-slate-100">
            realtime-communication/example/
            {active === 'websocket' ? 'websocket-server.mjs' : active === 'sse' ? 'sse-server.mjs' : 'polling-client.mjs'}
          </dd>
        </div>
      </dl>
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Recent Events (simulated)</h3>
        <ul className="space-y-1">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between rounded-md border border-indigo-500/20 bg-indigo-500/5 px-3 py-2 text-xs text-indigo-100"
            >
              <span>{event.strategy}</span>
              <span className="font-mono">{event.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-slate-500">{hint}</p>
    </div>
  );
}
