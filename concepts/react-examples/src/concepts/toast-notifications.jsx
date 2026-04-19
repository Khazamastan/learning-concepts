import { useId, useMemo, useRef, useState } from 'react';

const variantTokens = {
  success: {
    title: 'Changes published',
    description: 'User-facing copy updates in the next refresh window.',
    accent: 'bg-emerald-400',
    surface: 'from-emerald-500/20 to-emerald-500/5 border-emerald-400/60 text-emerald-100',
  },
  info: {
    title: 'New version available',
    description: 'Reload to pick up the latest service worker bundle.',
    accent: 'bg-sky-400',
    surface: 'from-sky-500/20 to-sky-500/5 border-sky-400/60 text-sky-100',
  },
  warning: {
    title: 'Retrying background sync',
    description: 'Connectivity is unstable. We will retry in 10 seconds.',
    accent: 'bg-amber-400',
    surface: 'from-amber-500/20 to-amber-500/5 border-amber-400/60 text-amber-100',
  },
  danger: {
    title: 'Save failed',
    description: 'API returned 503. Your draft stays local until retry succeeds.',
    accent: 'bg-rose-400',
    surface: 'from-rose-500/20 to-rose-500/5 border-rose-400/70 text-rose-100',
  },
};

function Toast({ toast, onDismiss }) {
  const { variant, title, description, duration, id } = toast;
  const styles = variantTokens[variant];
  const labelledBy = `${id}-title`;
  const describedBy = `${id}-description`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`group relative flex w-full max-w-sm pointer-events-auto overflow-hidden rounded-lg border bg-gradient-to-br shadow-lg shadow-black/40 backdrop-blur transition ${styles.surface}`}
    >
      <span className={`absolute left-0 top-0 h-full w-1 ${styles.accent}`} />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div id={labelledBy} className="text-sm font-medium">
          {title}
        </div>
        <p id={describedBy} className="text-xs text-slate-200/80">
          {description}
        </p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="my-3 mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-[10px] uppercase tracking-wide text-white/70 transition hover:border-white/40 hover:text-white"
        aria-label="Dismiss toast notification"
      >
        Esc
      </button>
      <span
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 animate-[toast-progress_var(--duration)_linear_forwards] bg-white/50"
        style={{ '--duration': `${duration}ms` }}
      />
    </div>
  );
}

export default function ToastNotifications() {
  const [toasts, setToasts] = useState([]);
  const announces = useMemo(
    () => [
      { variant: 'success', duration: 4000 },
      { variant: 'info', duration: 4500 },
      { variant: 'warning', duration: 6000 },
      { variant: 'danger', duration: 8000 },
    ],
    [],
  );
  const idPrefix = useId();
  const counterRef = useRef(0);
  const timersRef = useRef(new Map());

  const removeToast = (id) => {
    const timerId = timersRef.current.get(id);
    if (timerId) {
      clearTimeout(timerId);
      timersRef.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const launchToast = (config) => {
    const token = variantTokens[config.variant];
    const id = `${idPrefix}-${counterRef.current++}`;
    setToasts((previous) => [
      ...previous,
      {
        id,
        variant: config.variant,
        title: token.title,
        description: token.description,
        duration: config.duration,
      },
    ]);
    const timerId = setTimeout(() => {
      removeToast(id);
    }, config.duration);
    timersRef.current.set(id, timerId);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Toast Notifications & UX Micro-feedback</h2>
        <p className="text-sm text-slate-300">
          Toasts provide event-driven feedback without blocking workflows. Trigger them from domain events, retry loops, or optimistic mutations to communicate system state transitions.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {announces.map((announce) => (
          <button
            key={announce.variant}
            onClick={() => launchToast(announce)}
            className="rounded-lg border border-white/10 bg-slate-950/60 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-sky-400/60 hover:text-sky-100"
          >
            <div className="font-semibold uppercase tracking-wide text-slate-400">{announce.variant}</div>
            <div className="text-xs text-slate-400">Duration: {announce.duration / 1000}s</div>
            <div className="mt-1 text-xs text-slate-500">
              Ideal for {announce.variant === 'success' ? 'confirmations' : announce.variant === 'info' ? 'background updates' : announce.variant === 'warning' ? 'transient outages' : 'hard failures'}.
            </div>
          </button>
        ))}
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Live region</h3>
        <div className="pointer-events-none fixed inset-x-0 bottom-6 flex flex-col items-center gap-3 lg:bottom-10">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
          ))}
        </div>
        {toasts.length === 0 && (
          <p className="mt-3 text-xs text-slate-500">
            Nothing queued. Press a button above to see stacking, auto-dismiss timers, and accessible announcements.
          </p>
        )}
      </section>

      <section className="rounded-lg border border-white/10 bg-slate-900/50 p-4 text-xs text-slate-300">
        <p className="font-medium text-white">Implementation callouts</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Use a single portal-root for toasts so they overlay any route without z-index battles.</li>
          <li>Set <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-sky-200">aria-live=&quot;polite&quot;</code> to respect screen reader queues.</li>
          <li>Expose imperative helpers (e.g., <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-sky-200">toastQueue.push()</code>) so business logic can publish events.</li>
          <li>Throttle duplicate messages to avoid spamming—bundle identical events within a time window.</li>
        </ul>
      </section>
    </div>
  );
}
