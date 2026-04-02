# URL Shortener Concept Guide

## Concept Overview
A URL shortener maps long URLs to compact tokens that redirect users to the original destination. Production systems combine deterministic hashing, collision resolution, persistence, analytics, and abuse prevention. This guide dissects token generation strategies (base62 encoding, hashids), storage models (relational, NoSQL, in-memory caches), and redirect flows.

## Real-World Usage
- **Marketing Campaigns:** Bitly and TinyURL provide branded short links for tracking conversions from ads and social posts.
- **Messaging Apps:** Slack and Twitter shorten links to reduce character usage and improve readability.
- **Developer Tools:** GitHub gists share shortened URLs for code snippets that integrate with build status dashboards.

## Architecture Highlights
1. **Token Generation:** Either encode a monotonic identifier (base62) or hash the original URL with collision handling (e.g., MurmurHash + random salt).
2. **Storage Layer:** Use a write-optimized database (Redis, DynamoDB) and replicate data into caches for low-latency lookups.
3. **Redirect Service:** The edge service issues HTTP 301/302 responses and increments analytics counters asynchronously.
4. **Abuse Mitigation:** Integrate with malware scanners and rate limiting to block phishing or spam links.

## Included Working Example (Node.js)
The `example.js` script implements a minimal HTTP service with Node.js' standard library. Routes:
- `POST /shorten` with JSON `{ "url": "https://example.com" }`
- `GET /<token>` performs a 302 redirect to the stored URL.

Run the service and create a short URL:

```bash
node example.js
curl -X POST http://127.0.0.1:8000/shorten \
    -H 'Content-Type: application/json' \
    -d '{"url": "https://redis.io/docs"}'
# Follow the returned token with curl -I http://127.0.0.1:8000/<token>
```

## React 19 Interactive Demo
`example.jsx` simulates token generation and storage entirely in the browser:

```jsx
import UrlShortenerDemo from "./url-shortener/example.jsx";

export default function App() {
  return <UrlShortenerDemo />;
}
```

It maintains an in-memory map of tokens to long URLs, helping you demonstrate shortening flows without a backend.

## Learning Checklist
- Evaluate deterministic vs. random token generation.
- Consider data retention policies and GDPR compliance.
- Add click analytics and QR-code generation as stretch goals.

## References
- Bitly Engineering Blog – Scalable URL Shortening: https://bitly.is/scaling
- Google Cloud Architecture – Designing a URL shortener: https://cloud.google.com/architecture/designing-url-shortener
- RFC 7231 – HTTP Semantics (Redirects): https://www.rfc-editor.org/rfc/rfc7231
