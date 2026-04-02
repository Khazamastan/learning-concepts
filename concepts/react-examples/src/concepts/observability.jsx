const pillars = [
  { name: 'Logging', detail: 'Structured logs with correlation IDs. Use pino/winston + log drains.' },
  { name: 'Metrics', detail: 'Emit counters, histograms (Prometheus, StatsD) for latency and error rates.' },
  { name: 'Tracing', detail: 'Distributed tracing with OpenTelemetry to follow requests across services.' }
];

export default function Observability() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Observability: Logging, Error Tracking</h2>
      <p className="text-sm text-slate-300">
        Start <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">observability/example/server.mjs</code> to see pino logging and error tracking hooks.
      </p>
      <ul className="space-y-3">
        {pillars.map((item) => (
          <li key={item.name} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
            <p className="text-xs text-slate-400">{item.detail}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">Tie errors back to feature flags and experiments to accelerate incident triage.</p>
    </div>
  );
}
