# Rate Limiter Concept Guide

## Concept Overview
A rate limiter controls how many requests or operations are allowed during a fixed interval. It protects upstream services from overload, enforces fair usage, and prevents abuse. Popular algorithms include the token bucket, leaky bucket, fixed window, and sliding window log/counter. Distributed systems combine in-memory limiters with centralized stores (Redis, Memcached) or probabilistic sketches.

## Real-World Usage
- **API Gateways:** Stripe and GitHub enforce rate limits to protect against bursty clients and ensure predictable latencies.
- **CDNs and WAFs:** Cloudflare applies per-IP throttling to mitigate DDoS attacks.
- **Microservices:** Internal service meshes (Envoy, Linkerd) implement per-route rate limits to maintain service-level objectives.

## Architecture Highlights
1. **Policy Definition:** Limits may be per user, IP, API key, or tenant. Policies often combine burst and sustained rates.
2. **State Storage:** Local in-memory counters offer low latency; distributed stores (Redis) coordinate across instances.
3. **Algorithm Choice:** Token bucket allows short bursts while enforcing average rate; leaky bucket smooths bursts; sliding window offers precise enforcement but higher storage cost.
4. **Feedback:** HTTP 429 responses or gRPC status `RESOURCE_EXHAUSTED` inform clients about throttling; headers (e.g., `Retry-After`) guide retries.

## Included Working Example (Node.js)
The `example.js` script exposes an HTTP endpoint at `http://127.0.0.1:5000/` and applies a token-bucket rate limit of 5 requests per 10 seconds. Exceeding the limit returns HTTP 429 with retry guidance.

```bash
node example.js
# In another shell
for i in {1..7}; do curl -i http://127.0.0.1:5000/; done
```

## React 19 Interactive Demo
`example.jsx` visualizes a token bucket in the browser:

```jsx
import RateLimiterDemo from "./rate-limiter/example.jsx";

export default function App() {
  return <RateLimiterDemo />;
}
```

Users can emit synthetic requests and observe token depletion and refill behavior.

## Learning Checklist
- Swap the in-memory bucket for Redis or Memcached to coordinate across replicas.
- Emit Prometheus metrics for allowed vs. throttled requests.
- Implement adaptive throttling that adjusts limits based on upstream health.

## References
- AWS Architecture Blog – Rate Limiting Strategies: https://aws.amazon.com/blogs/architecture/rate-limiting-strategies-and-data-sharing-approaches/
- Cloudflare Blog – How Rate Limiting Works: https://blog.cloudflare.com/rate-limiting/
- Envoy Proxy Documentation – Rate Limit Filter: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/rate_limit_filter
