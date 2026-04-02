const patterns = [
  { name: 'Retry', description: 'Idempotent operations with exponential backoff and jitter.' },
  { name: 'Circuit Breaker', description: 'Fail fast after threshold exceeded; half-open probes to recover.' },
  { name: 'Timeouts', description: 'Set client/server timeouts to avoid hanging requests.' }
];

export default function Resiliency() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Retry, Backoff, Circuit Breakers</h2>
      <p className="text-sm text-slate-300">
        Play with the resilience client at <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">resiliency-patterns/example/client.mjs</code> to
        watch retries and breaker states in the console.
      </p>
      <ul className="space-y-3">
        {patterns.map((pattern) => (
          <li key={pattern.name} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{pattern.name}</h3>
            <p className="text-xs text-slate-400">{pattern.description}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">Instrument retries with structured logs to monitor live systems (see Observability concept).</p>
    </div>
  );
}
