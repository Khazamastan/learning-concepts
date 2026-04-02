const controls = [
  { title: 'XSS', detail: 'Escape user input, use Content Security Policy (CSP), avoid dangerouslySetInnerHTML.' },
  { title: 'CSRF', detail: 'Use SameSite cookies, CSRF tokens, double-submit patterns.' },
  { title: 'CSP', detail: 'Define script-src, connect-src, img-src directives with nonces or hashes.' },
  { title: 'SameSite Cookies', detail: 'Set SameSite=Lax or Strict for session cookies; pair with HttpOnly, Secure.' }
];

export default function WebSecurity() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Security: XSS, CSRF, CSP, SameSite Cookies</h2>
      <p className="text-sm text-slate-300">
        Review the security headers emitted by <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">web-security-advanced/example/server.mjs</code>.
      </p>
      <ul className="space-y-3">
        {controls.map((control) => (
          <li key={control.title} className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-100">{control.title}</h3>
            <p className="text-xs text-slate-400">{control.detail}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">Use securityheaders.com or Mozilla Observatory to audit deployments.</p>
    </div>
  );
}
