const modes = [
  {
    name: 'CSR',
    detail: 'Client-side rendering via SPA hydration. Fast deploys, but initial load relies on JS execution.'
  },
  {
    name: 'SSR',
    detail: 'Server renders HTML per request. Great for dynamic data with SEO requirements.'
  },
  {
    name: 'SSG',
    detail: 'Static Site Generation at build time. Ideal for mostly static content with rebuild pipelines.'
  },
  {
    name: 'ISR',
    detail: 'Incremental Static Regeneration. Mix static output with on-demand revalidation.'
  }
];

export default function RenderingStrategies() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Rendering Strategies</h2>
      <p className="text-sm text-slate-300">
        Compare hydration modes in the Node sample (<code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">rendering-strategies/example/server.mjs</code>)
        or integrate with Next.js/Remix demos.
      </p>
      <ul className="space-y-3">
        {modes.map((mode) => (
          <li key={mode.name} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{mode.name}</h3>
            <p className="text-xs text-slate-400">{mode.detail}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">Experiment by toggling the rendering mode environment variable in the sample server.</p>
    </div>
  );
}
