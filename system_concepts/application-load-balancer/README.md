# Application Load Balancer Concept Guide

## Concept Overview
An application load balancer (ALB) distributes client requests across multiple upstream services. Unlike network load balancers that operate at Layer 4, an ALB works at Layer 7, understands HTTP semantics, and can make routing decisions based on URL paths, headers, cookies, or request bodies. Modern systems combine health checks, sticky sessions, TLS termination, and observability to keep applications resilient and performant.

## Real-World Usage
- **AWS Application Load Balancer:** Routes HTTP/HTTPS traffic to microservices running on EC2, ECS, or EKS. Supports path-based routing and WebSocket.
- **NGINX / HAProxy:** Self-hosted reverse proxies widely deployed for blue/green deployments and canary releases.
- **Cloudflare / Fastly:** Edge load balancers provide global Anycast routing with built-in DDoS mitigation and HTTP caching.

## Architecture Highlights
1. **Listener & Rules:** The listener terminates TCP/TLS and evaluates routing rules (host/path) to select a target group.
2. **Health Checks:** Periodic probes remove unhealthy targets to prevent cascading failures.
3. **Algorithms:** Round-robin, least-connections, and weighted routing control traffic flow. Advanced systems support request hashing to maintain stickiness.
4. **Observability:** Access logs, distributed tracing headers (X-Request-ID), and metrics (P99 latency, error rate) feed into alerting pipelines.

## Included Working Example (Node.js)
The `example.js` script spins up two toy backend services and a round-robin Layer 7 balancer implemented with Node.js. Startup instructions:

```bash
node example.js
# In another terminal
curl http://127.0.0.1:8080/api/hello
curl http://127.0.0.1:8080/api/hello
# Responses alternate between backend A and backend B
```

The balancer proxies requests, adds an `X-Upstream-Host` header, and demonstrates round-robin traffic distribution.

## React 19 Interactive Demo
`example.jsx` provides an interactive visualization of round-robin routing. Add it to your React 19 app:

```jsx
import LoadBalancerDemo from "./application-load-balancer/example.jsx";

export default function App() {
  return <LoadBalancerDemo />;
}
```

The component lets you add/remove backends and dispatch requests to observe load-balancing behavior without a backend process.

## Learning Checklist
- Experiment with weighted routing or consistent hashing to add sticky sessions.
- Extend health checks to use separate endpoints and backoff logic.
- Capture and analyze access logs to compute rolling error budgets.

## References
- AWS Elastic Load Balancing – Application Load Balancers: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html
- HAProxy Documentation – Load Balancing Algorithms: https://docs.haproxy.org/3.0/configuration.html#4-balance
- Google SRE Book – Load Balancing Front Ends: https://sre.google/sre-book/load-balancing-frontend/
