const practices = [
  'Render friendly fallbacks with Error Boundaries wrapping risky components.',
  'Log unexpected exceptions to observability pipeline (Sentry, Honeybadger).',
  'Gracefully degrade non-critical features when dependencies fail.'
];

export default function ErrorHandling() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Error Handling & Graceful Degradation</h2>
      <p className="text-sm text-slate-300">
        Examine <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">error-handling/example/server.mjs</code> to see API retries and fallback responses.
      </p>
      <ul className="space-y-2">
        {practices.map((practice) => (
          <li key={practice} className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
            {practice}
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">Test failure modes locally by toggling the injected fault flags in the sample.</p>
    </div>
  );
}
