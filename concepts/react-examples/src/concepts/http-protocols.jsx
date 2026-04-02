import { useEffect, useState } from 'react';

const latencyProfiles = {
  http1: { name: 'HTTP/1.1', latency: 180, connection: 'Multiple TCP sockets', feature: 'Sequential requests (HOL blocking)' },
  http2: { name: 'HTTP/2', latency: 110, connection: 'Single multiplexed TCP', feature: 'Header compression (HPACK)' },
  http3: { name: 'HTTP/3', latency: 70, connection: 'QUIC over UDP', feature: '0-RTT resumption' }
};

export default function HttpProtocols() {
  const [profile, setProfile] = useState('http3');
  const metrics = latencyProfiles[profile];
  const [simulatedTtfb, setSimulatedTtfb] = useState(metrics.latency);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSimulatedTtfb(metrics.latency + Math.round(Math.random() * 20 - 10));
    }, 450);
    return () => clearTimeout(timeout);
  }, [metrics]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">HTTP Transport Comparison</h2>
      <p className="text-sm leading-relaxed text-slate-300">
        Toggle between protocol generations to see how connection management and round-trip times improve. Pair the UI with the
        Node demo in <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">http-protocols/example/server.mjs</code> to
        observe HTTP/1.1, HTTPS, and HTTP/2 in action. For HTTP/3, terminate QUIC with a capable proxy (Cloudflare tunnel, Caddy).
      </p>
      <div className="flex gap-2">
        {Object.entries(latencyProfiles).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setProfile(key)}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              profile === key ? 'border-sky-400 bg-sky-500/10 text-sky-100' : 'border-white/10 text-slate-300 hover:border-sky-400/50'
            }`}
          >
            {value.name}
          </button>
        ))}
      </div>
      <dl className="grid gap-2 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Connection Strategy</dt>
          <dd className="text-sm text-slate-100">{metrics.connection}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Standout Feature</dt>
          <dd className="text-sm text-slate-100">{metrics.feature}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Simulated TTFB (ms)</dt>
          <dd className="text-2xl font-semibold text-sky-300">{simulatedTtfb}</dd>
        </div>
      </dl>
      <p className="text-xs text-slate-500">
        This simulation uses random jitter to illustrate how QUIC&apos;s stream independence avoids head-of-line blocking compared to
        TCP-based protocols.
      </p>
    </div>
  );
}
