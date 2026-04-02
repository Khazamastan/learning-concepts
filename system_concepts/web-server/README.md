# Web Server Concept Guide

## Concept Overview
A web server accepts HTTP requests, processes them, and delivers responses (HTML, JSON, files). Core responsibilities include connection management (keep-alive, TLS), request parsing, routing, static asset delivery, and integration with application frameworks (CGI, WSGI, ASGI). Modern servers support HTTP/1.1, HTTP/2, and increasingly HTTP/3 over QUIC.

## Real-World Usage
- **Nginx / Apache HTTPD:** Serve static content, reverse proxy dynamic apps, terminate TLS, and provide load balancing features.
- **Node.js (Express/Fastify):** Application servers for APIs and web apps with event-driven concurrency.
- **Rust/Go Servers:** Lightweight binaries (Actix, Go net/http) powering high-performance microservices and APIs.

## Architecture Highlights
1. **Concurrency Model:** Thread-per-connection, event loop (epoll/kqueue), or async IO determine scalability.
2. **Routing Layer:** Maps HTTP methods and paths to handlers; may include middleware for auth, compression, caching.
3. **Static Assets:** Efficient file serving uses zero-copy (sendfile), caching headers, and gzip/brotli compression.
4. **Observability:** Access logs, metrics, and tracing provide insights into latency, throughput, and errors.

## Included Working Example (Node.js)
The `example.js` script implements a minimal HTTP server with routing and static-file support.

```bash
node example.js
# Visit http://127.0.0.1:8081/
```

Handlers showcase HTML rendering, JSON output, and file downloads.

## React 19 Interactive Demo
`example.jsx` illustrates how a routing table resolves incoming requests:

```jsx
import WebServerDemo from "./web-server/example.jsx";

export default function App() {
  return <WebServerDemo />;
}
```

Use it to simulate HTTP method/path matching without spinning up a real server.

## Learning Checklist
- Add TLS termination using Python's `ssl` module.
- Integrate Jinja2 templates for dynamic HTML.
- Implement middleware for logging, gzip compression, and caching headers.

## References
- RFC 9110 – HTTP Semantics: https://www.rfc-editor.org/rfc/rfc9110
- Nginx Documentation – Architecture: https://nginx.org/en/docs/
- Python WSGI Specification (PEP 3333): https://peps.python.org/pep-3333/
