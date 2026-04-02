# Compression (gzip, Brotli)

## Overview
HTTP compression reduces payload sizes and improves Time to First Byte (TTFB). Gzip is universally supported, while Brotli offers better
compression ratios for static assets when served over HTTPS. Modern CDNs can negotiate the optimal encoding based on the `Accept-Encoding`
request header.

## Working Example
`example/server.mjs` uses Express with the `compression` middleware.
1. Install dependencies: `npm install`.
2. Start the server: `npm run start:compression` (http://localhost:4302).
3. Execute `curl -H "accept-encoding: gzip" -I http://localhost:4302/` and note the `content-encoding` and `x-compression` headers.
4. Disable compression with `curl "http://localhost:4302/?disable=true"` to compare payload sizes.
5. Switch the middleware to use Brotli (e.g., using `shrink-ray-current` or CDN settings) and compare the transfer size.

## References
- Google Web.dev — [Enable text compression](https://web.dev/uses-text-compression/)
- Cloudflare — [Brotli vs Gzip](https://www.cloudflare.com/learning/performance/brotli/)
- IETF RFC 7932 — [Brotli Compressed Data Format](https://www.rfc-editor.org/rfc/rfc7932)
