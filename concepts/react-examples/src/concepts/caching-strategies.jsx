const strategies = [
  { title: 'Cache-Control', body: 'Set max-age, s-maxage, stale-while-revalidate to control browser and CDN behavior.' },
  { title: 'ETags & Revalidation', body: 'Use conditional requests (If-None-Match, If-Modified-Since) to avoid transferring unchanged payloads.' },
  { title: 'Service Worker Cache', body: 'Leverage Cache API for precaching shell assets and runtime caching of API responses.' }
];

export default function CachingStrategies() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Browser & CDN Caching Strategies</h2>
      <p className="text-sm text-slate-300">
        Combine HTTP caching headers, CDN rules, and service workers to reduce origin load. See the example server in
        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">caching-strategies/example/server.mjs</code> for practical demos.
      </p>
      <ul className="space-y-3">
        {strategies.map((strategy) => (
          <li key={strategy.title} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{strategy.title}</h3>
            <p className="text-xs text-slate-400">{strategy.body}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">
        Tip: Monitor with `curl -I` and Chrome DevTools &gt; Network tab to verify cache hits/misses while running the Node sample.
      </p>
    </div>
  );
}
