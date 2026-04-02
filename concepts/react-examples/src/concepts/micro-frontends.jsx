const approaches = [
  { name: 'Module Federation', note: 'Share builds at runtime via webpack federation or Vite module federation plugins.' },
  { name: 'Iframe Isolation', note: 'Encapsulate legacy apps while slowly migrating styling and state sharing.' },
  { name: 'Edge Composition', note: 'Assemble fragments at the CDN edge using ESI or edge functions.' }
];

export default function MicroFrontends() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Micro-frontends & Modularization</h2>
      <p className="text-sm text-slate-300">
        Launch the host and remote demos (`npm run start:micro-frontends:host` etc.) to see module federation in action.
      </p>
      <ul className="space-y-3">
        {approaches.map((item) => (
          <li key={item.name} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
            <p className="text-xs text-slate-400">{item.note}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">
        Consider single-spa, Bit, or Rush for orchestration. Monitor bundle duplication and shared dependency versions.
      </p>
    </div>
  );
}
