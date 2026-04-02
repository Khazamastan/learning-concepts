# CDNs & Edge Delivery

## Overview
Content Delivery Networks (CDNs) replicate static assets and increasingly dynamic responses across global edge POPs. They reduce latency by
serving users from nearby nodes, terminate TLS, and increasingly execute logic (edge functions, KV storage) close to the user. Modern CDNs
provide programmable features such as surrogate keys for cache invalidation, edge key-value stores, and request/response rewrites.

## Why It Matters
- **Latency**: A/B tests by Cloudflare and Fastly show 20–40% reductions in p95 latency when assets are cached near users.
- **Reliability**: Multi-region failover and request collapsing protect the origin from thundering herd events.
- **Security**: CDNs absorb DDoS attacks, enforce WAF rules, and handle certificate rotation centrally.

## Working Example
`example/server.mjs` simulates origin responses that would be cached at the edge.
1. Install dependencies at repo root: `npm install`.
2. Start the demo: `npm run start:cdn` (defaults to http://localhost:4300).
3. Request `/` multiple times and observe headers like `cache-control`, `surrogate-control`, and `x-debug-geo`.
4. Fetch `/hero.png` to see long-lived static asset caching, and `/purge` to simulate surrogate key invalidation.

## Going Further
- Deploy the endpoint behind a real CDN (Cloudflare Workers, Fastly Compute@Edge) and compare `cf-cache-status` or `x-cache` hits.
- Experiment with signed URLs and origin shielding to protect private content.

## References
- Cloudflare — [How a CDN Works](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
- Fastly — [Surrogate Keys for Instant Purging](https://docs.fastly.com/en/guides/getting-started-with-surrogate-keys)
- Akamai — [Edge Platform Overview](https://www.akamai.com/resources/white-papers/akamai-edge-platform)
