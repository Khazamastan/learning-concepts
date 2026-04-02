const hints = [
  { tag: 'preconnect', usage: 'Warm up TLS and TCP to critical origins (CDN, APIs).' },
  { tag: 'preload', usage: 'Fetch high-priority assets (fonts, hero image) ahead of parser discovery.' },
  { tag: 'prefetch', usage: 'Low-priority fetch for future navigation/routes (React Router data).' },
  { tag: 'dns-prefetch', usage: 'Resolve DNS early for third-party domains when full preconnect is too costly.' }
];

export default function ResourceHints() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Resource Hints</h2>
      <p className="text-sm text-slate-300">
        Inspect <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">resource-hints/example/index.html</code> to see each hint in context and
        measure their effect with Lighthouse.
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        {hints.map((hint) => (
          <div key={hint.tag} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{`<link rel="${hint.tag}">`}</h3>
            <p className="text-xs text-slate-400">{hint.usage}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        Use Chrome DevTools &gt; Network &gt; Initiator column to validate hints are firing before navigation.
      </p>
    </div>
  );
}
