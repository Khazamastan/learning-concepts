const comparisons = [
  {
    name: 'Client State',
    example: 'UI state (dialogs, form inputs) with React Context or Zustand.',
    note: 'Lives in the browser; fast updates but resets on navigation unless persisted.'
  },
  {
    name: 'Server State',
    example: 'Remote data fetched via React Query / SWR, cached per request.',
    note: 'Authoritative source is on server; handle invalidation and caching windows.'
  },
  {
    name: 'Hybrid',
    example: 'Use server components / actions to mutate data, hydrate client hooks for interactions.',
    note: 'Leverage React 19 server actions with optimistic updates on client.'
  }
];

export default function StateManagement() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Client vs. Server State Management</h2>
      <p className="text-sm text-slate-300">
        Explore the sample under <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">state-management/example/</code> to see React Query and
        server-side caching patterns.
      </p>
      <div className="space-y-3">
        {comparisons.map((row) => (
          <div key={row.name} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{row.name}</h3>
            <p className="text-xs text-slate-400">{row.example}</p>
            <p className="text-xs text-slate-500">{row.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
