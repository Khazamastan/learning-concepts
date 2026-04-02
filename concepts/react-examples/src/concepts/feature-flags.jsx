const rolloutSteps = [
  'Define feature flag and default rule (off) in your flag provider.',
  'Gradually expose to internal users, then percentage rollout.',
  'Capture experiment metrics and guard for forced disable (kill switch).'
];

export default function FeatureFlags() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Feature Flags & A/B Testing</h2>
      <p className="text-sm text-slate-300">
        Run <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">feature-flags/example/server.mjs</code> to see flag evaluation across environments.
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-200">
        {rolloutSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p className="text-xs text-slate-500">Integrations: LaunchDarkly, GrowthBook, Split, Vercel Flags API.</p>
    </div>
  );
}
