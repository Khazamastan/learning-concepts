# Browser & CDN Caching Strategies

## Overview
Effective caching blends HTTP cache headers, CDN behavior, and service worker storage. By tuning directives like `Cache-Control`, `ETag`,
and `stale-while-revalidate`, you can reduce origin load while ensuring freshness.

## Key Patterns
- **Long-lived immutable assets** (`max-age=31536000, immutable`) for hashed bundles.
- **Conditional revalidation** using `ETag` or `Last-Modified` to ship 304 responses when content is unchanged.
- **Stale-while-revalidate** to serve slightly stale content while fetching an updated copy in the background.

## Working Example
`example/server.mjs` exposes endpoints showcasing each pattern.
1. Install dependencies once: `npm install`.
2. Start the server: `npm run start:caching` (http://localhost:4301).
3. Request `/immutable.js` and note the immutable cache directive.
4. Fetch `/revalidate` twice with `curl -I` to see 304 responses when the `If-None-Match` header is present.
5. Hit `/stale-while-revalidate` repeatedly and watch stale data served while the background fetch refreshes.

## References
- MDN — [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- Chrome Developers — [Caching best practices](https://web.dev/http-cache/)
- RFC 5861 — [Stale-While-Revalidate Directive](https://www.rfc-editor.org/rfc/rfc5861)
