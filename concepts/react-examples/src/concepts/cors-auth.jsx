import { useMemo, useState } from 'react';

const cookiePresets = {
  localDev: {
    label: 'Local Dev',
    settings: { httpOnly: true, secure: false, sameSite: 'lax' },
    description: 'Running over http://localhost. Use secure=false so cookies arrive without TLS.'
  },
  staging: {
    label: 'Staging HTTPS',
    settings: { httpOnly: true, secure: true, sameSite: 'lax' },
    description: 'Hosted on HTTPS with cross-subdomain OAuth callbacks.'
  },
  prod: {
    label: 'Production',
    settings: { httpOnly: true, secure: true, sameSite: 'strict' },
    description: 'Most defensive posture. SameSite=strict prevents CSRF for GET navigations.'
  }
};

const corsModes = {
  spa: {
    label: 'SPA + API',
    allowOrigin: 'https://app.example.com',
    allowCredentials: true
  },
  publicApi: {
    label: 'Public API',
    allowOrigin: '*',
    allowCredentials: false
  },
  multiTenant: {
    label: 'Multi-tenant SaaS',
    allowOrigin: 'dynamic (team allow list)',
    allowCredentials: true
  }
};

export default function CorsAuth() {
  const [cookieMode, setCookieMode] = useState('localDev');
  const [corsMode, setCorsMode] = useState('spa');

  const snippet = useMemo(() => {
    const cookie = cookiePresets[cookieMode].settings;
    const cors = corsModes[corsMode];
    return [
      "app.use(cors({",
      `  origin: ${JSON.stringify(cors.allowOrigin)},`,
      `  credentials: ${cors.allowCredentials},`,
      "}));",
      "",
      "res.cookie('sessionId', value, {",
      `  httpOnly: ${cookie.httpOnly},`,
      `  secure: ${cookie.secure},`,
      `  sameSite: '${cookie.sameSite}'`,
      "});"
    ].join('\n');
  }, [cookieMode, corsMode]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">CORS & Cookie Hardening</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">CORS Scenario</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(corsModes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setCorsMode(key)}
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  corsMode === key ? 'border-amber-400 bg-amber-500/10 text-amber-100' : 'border-white/10 text-slate-300 hover:border-amber-400/50'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400">
            Allow-Origin: <span className="text-slate-200">{corsModes[corsMode].allowOrigin}</span> · Allow-Credentials:{' '}
            <span className="text-slate-200">{String(corsModes[corsMode].allowCredentials)}</span>
          </p>
        </section>
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Cookie Policy</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(cookiePresets).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setCookieMode(key)}
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  cookieMode === key ? 'border-amber-400 bg-amber-500/10 text-amber-100' : 'border-white/10 text-slate-300 hover:border-amber-400/50'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400">{cookiePresets[cookieMode].description}</p>
        </section>
      </div>
      <pre className="rounded-lg border border-white/10 bg-slate-950/70 p-4 text-xs text-slate-200">
        <code>{snippet}</code>
      </pre>
      <p className="text-xs text-slate-500">
        The Express example at cors-auth-tokens/example/server.mjs reads ALLOWED_ORIGINS from .env and issues secure cookies as shown above. Flip
        COOKIE_SECURE to true when deploying behind HTTPS.
      </p>
    </div>
  );
}
