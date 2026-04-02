const vitals = [
  { name: 'LCP', threshold: '≤2.5s', tip: 'Optimize hero image load, server render HTML, use priority hints.' },
  { name: 'CLS', threshold: '<0.1', tip: 'Reserve layout space, avoid layout shifts from ads/fonts.' },
  { name: 'INP', threshold: '<200ms', tip: 'Reduce main-thread work, use React 19 transitions for expensive updates.' },
  { name: 'TTFB', threshold: '<800ms', tip: 'Leverage edge caching, optimize server rendering path.' },
  { name: 'FID', threshold: '<100ms', tip: 'Mostly replaced by INP but still monitor for older browsers.' }
];

export default function CoreWebVitals() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Core Web Vitals</h2>
      <p className="text-sm text-slate-300">
        Open <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">core-web-vitals/example/</code> and run Lighthouse or Web Vitals extension to
        track metrics.
      </p>
      <table className="w-full table-auto overflow-hidden rounded-lg border border-white/10 text-sm text-slate-200">
        <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-2 text-left">Metric</th>
            <th className="px-3 py-2 text-left">Good Threshold</th>
            <th className="px-3 py-2 text-left">Improvement Tips</th>
          </tr>
        </thead>
        <tbody>
          {vitals.map((vital) => (
            <tr key={vital.name} className="odd:bg-slate-900/60 even:bg-slate-900/30">
              <td className="px-3 py-2 font-semibold text-slate-100">{vital.name}</td>
              <td className="px-3 py-2">{vital.threshold}</td>
              <td className="px-3 py-2 text-xs text-slate-400">{vital.tip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-500">Monitor real-user metrics via GA4, Segment, or custom Web-Vitals scripts.</p>
    </div>
  );
}
