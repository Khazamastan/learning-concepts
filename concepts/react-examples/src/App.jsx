import { Suspense, use, useState, useTransition } from 'react';
import { concepts } from './concepts/index.js';

function ConceptContent({ concept }) {
  const Component = use(concept.component());
  return <Component />;
}

function ConceptView({ concept }) {
  return (
    <Suspense fallback={<div className="p-6 text-sky-400 animate-pulse">Loading example…</div>}>
      <ConceptContent concept={concept} />
    </Suspense>
  );
}

export default function App() {
  const [selected, setSelected] = useState(concepts[0].id);
  const [isPending, startTransition] = useTransition();
  const activeConcept = concepts.find((concept) => concept.id === selected) ?? concepts[0];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight text-white">Frontend Systems React 19 Playbook</h1>
          <span className="text-sm text-slate-400">React 19 (next tag) • Vite 5</span>
        </div>
      </header>
      <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8 md:grid-cols-[280px_1fr]">
        <aside className="space-y-2">
          {concepts.map((concept) => {
            const isActive = concept.id === selected;
            return (
              <button
                key={concept.id}
                onClick={() => startTransition(() => setSelected(concept.id))}
                className={`block w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? 'border-sky-400 bg-sky-500/10 text-sky-100 shadow-inner shadow-sky-900'
                    : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-sky-400/60 hover:text-sky-200'
                }`}
              >
                {concept.title}
              </button>
            );
          })}
        </aside>
        <section className="rounded-xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
          {isPending && <div className="mb-3 text-xs uppercase tracking-wide text-slate-400">Switching…</div>}
          <ConceptView concept={activeConcept} />
        </section>
      </main>
    </div>
  );
}
