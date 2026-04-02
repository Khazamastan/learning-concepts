const steps = [
  'Register a service worker and cache app shell assets.',
  'Queue mutations with Background Sync or IndexedDB when offline.',
  'Provide UI affordances indicating offline mode and sync status.'
];

export default function OfflineFirst() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Offline-first & Service Workers</h2>
      <p className="text-sm text-slate-300">
        Inspect <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">offline-first/example/</code> for a PWA manifest and service worker script.
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-200">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p className="text-xs text-slate-500">Use Chrome DevTools &gt; Application tab to simulate offline behavior.</p>
    </div>
  );
}
