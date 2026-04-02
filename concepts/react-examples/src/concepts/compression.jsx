const compressors = [
  { name: 'gzip', ratio: '3-4x', note: 'Broad support; great default but slightly slower to compress.' },
  { name: 'Brotli', ratio: '5-7x', note: 'Best for static assets; use level 5-6 in CDNs to balance CPU cost.' },
  { name: 'Zstd', ratio: 'Variable', note: 'Emerging support; excellent streaming performance for APIs.' }
];

export default function Compression() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Compression (gzip, Brotli)</h2>
      <p className="text-sm text-slate-300">
        Toggle compression in <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">compression/example/server.mjs</code> to see size and time
        differences. Use `curl -H "accept-encoding: br"` to request Brotli.
      </p>
      <table className="w-full table-auto overflow-hidden rounded-lg border border-white/10 text-sm text-slate-200">
        <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-2 text-left">Encoder</th>
            <th className="px-3 py-2 text-left">Typical Ratio</th>
            <th className="px-3 py-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {compressors.map((item) => (
            <tr key={item.name} className="odd:bg-slate-900/60 even:bg-slate-900/30">
              <td className="px-3 py-2 font-semibold text-slate-100">{item.name}</td>
              <td className="px-3 py-2">{item.ratio}</td>
              <td className="px-3 py-2 text-xs text-slate-400">{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-500">Measure with Chrome DevTools or `webpagetest.org` to confirm transfer savings.</p>
    </div>
  );
}
