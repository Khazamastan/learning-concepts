const techniques = [
  { name: 'Lazy Loading', detail: 'Defer non-critical components with React.lazy/Suspense or dynamic imports.' },
  { name: 'Code Splitting', detail: 'Split bundles by route or component; see Vite dynamic imports in this project.' },
  { name: 'Tree Shaking', detail: 'Ensure ESM imports and remove dead code with bundler optimizations.' }
];

export default function PerformanceOptimizations() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Lazy Loading, Code Splitting, Tree Shaking</h2>
      <p className="text-sm text-slate-300">
        The React examples app itself uses dynamic imports per concept. Inspect the build output (`npm --prefix react-examples run build`) to
        view generated chunks.
      </p>
      <ul className="space-y-3">
        {techniques.map((item) => (
          <li key={item.name} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
            <p className="text-xs text-slate-400">{item.detail}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">
        Try the Node bundler demo in <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">performance-optimizations/example/</code> to see
        before/after bundle graphs.
      </p>
    </div>
  );
}
