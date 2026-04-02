# CORS, Authentication, Cookies, Tokens

## Overview
Securing browser-based applications requires cross-origin resource sharing (CORS) configuration, session management, and token handling.
- **CORS** defines how browsers permit cross-origin HTTP requests using response headers (`Access-Control-Allow-Origin`, etc.).
- **Cookies** store small bits of state; secure cookies include flags like `HttpOnly`, `Secure`, and `SameSite` to mitigate theft and CSRF.
- **Tokens** (JWT, opaque tokens) encode or reference authentication state and are typically placed in Authorization headers or secure cookies.
- **Auth flows** such as session cookies, OAuth 2.0, and OpenID Connect include steps for credential verification, token issuance, and refresh.

## Best Practices
- Use `Access-Control-Allow-Origin` with explicit origins or dynamic allow-lists instead of `*` for authenticated endpoints.
- Set `HttpOnly`, `Secure`, and `SameSite=Lax` (or `Strict` for sensitive flows) on cookies that carry tokens.
- Protect APIs with rate limiting, refresh token rotations, and short-lived access tokens; revoke using server-side blacklists or introspection endpoints.

## Real-World Example
A single-page app hosted at `https://app.example.com` calls APIs at `https://api.example.com`. The API enables CORS for the app origin, issues an `HttpOnly` session cookie after login, and rotates refresh tokens stored in secure cookies while access tokens go into the `Authorization: Bearer` header for AJAX calls.

## Working Example (This Repository)
The Express server in `example/server.mjs` illustrates:
- CORS with an allow-list read from `.env` (`ALLOWED_ORIGINS`).
- Login route validating a hard-coded user and issuing both an `HttpOnly` cookie (`sessionId`) and a signed access token (simulated) in the JSON response.
- Protected route verifying the token from the `Authorization` header and echoing the user profile.
- Refresh route issuing a new token when a valid cookie is presented.

### Run the demo
1. `npm install`.
2. Copy `.env.example` to `.env` and adjust allowed origin: `cp cors-auth-tokens/example/.env.example cors-auth-tokens/example/.env`. Set `COOKIE_SECURE=false` for local HTTP testing (use `true` when serving over HTTPS).
3. Start the server: `npm run start:cors-auth` (listens on `http://localhost:4200`).
4. Use `curl` or a REST client:
   - Login: `curl -i -X POST http://localhost:4200/login -H "content-type: application/json" -d '{"email":"user@example.com","password":"password"}'`.
   - Access protected data: `curl -i http://localhost:4200/profile -H "Authorization: Bearer <token-from-login>" --cookie "sessionId=<cookie-value>"`.

## References
- MDN — [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- OWASP — [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- IETF RFC 7519 — [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519)
- OAuth 2.0 Security Best Current Practice — [draft-ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
