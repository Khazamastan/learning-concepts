# HTTP/HTTPS, HTTP/2, HTTP/3

## Overview
HyperText Transfer Protocol (HTTP) defines how clients and servers exchange requests and responses over the web. HTTP/1.1 builds on the original protocol with persistent connections and chunked transfer encoding. HTTPS wraps HTTP inside TLS to provide confidentiality, integrity, and authentication. HTTP/2 introduces binary framing, multiplexing, header compression (HPACK), and server push to improve performance. HTTP/3 replaces TCP with QUIC (a UDP-based, connection-multiplexing transport) to reduce head-of-line blocking and accelerate connection establishment with TLS 1.3 built in by default.

## Key Differences
- **Connection Management**: HTTP/1.1 pipelines requests but still experiences head-of-line blocking; HTTP/2 multiplexes streams over one TCP connection; HTTP/3 multiplexes over QUIC streams, avoiding TCP-level blocking.
- **Security**: HTTPS mandates TLS. HTTP/3 requires TLS 1.3 as part of QUIC, eliminating separate handshakes and providing 0-RTT resumption.
- **Header Compression**: HTTP/2 uses HPACK; HTTP/3 introduces QPACK to safely compress headers across independent QUIC streams.
- **Deployment Notes**: HTTP/2 requires ALPN negotiation over TLS; HTTP/3 needs QUIC support on both client and server as well as UDP-friendly network paths (firewalls must allow UDP/443).

## Real-World Example
A modern ecommerce site uses HTTP/2 or HTTP/3 via a CDN (e.g., Cloudflare, Fastly, Akamai) to deliver assets quickly. Multiplexing allows CSS, JavaScript, and API calls to share a single connection, while TLS 1.3 and OCSP stapling reduce latency and improve security. Migrating to HTTP/3 further boosts performance for mobile users on high-latency networks because QUIC tolerates packet loss without stalling other streams.

## Working Example (This Repository)
This folder contains a small Node.js application that spins up:
1. An HTTP/1.1 server responding with plain text.
2. An HTTPS server using a self-signed certificate to demonstrate TLS.
3. An HTTP/2 server delivering a push asset.

> Note: Implementing HTTP/3 locally currently requires additional native dependencies. See the "Going Further" section for guidance using `cloudflared` or `nginx-quic` if you want a local QUIC endpoint.

### Run the demo
1. Install dependencies at the repository root: `npm install`.
2. Generate local certificates (self-signed) using the provided script command: `node http-protocols/example/generate-cert.mjs`.
3. Start all servers: `npm run start:http-protocols`.
4. Visit the HTTP/1.1 endpoint: `http://localhost:3000/`.
5. Visit the HTTPS endpoint (accept the cert warning in your browser): `https://localhost:3443/`.
6. Test HTTP/2 with `curl --http2 -k https://localhost:3444/h2` to see the pushed asset logged in the terminal.

## How it Works
- `server.mjs` creates three servers (HTTP, HTTPS, HTTP/2) sharing a simple routing layer.
- The HTTPS server uses TLS configuration from `cert.pem` and `key.pem` generated at runtime.
- The HTTP/2 server uses `http2.createSecureServer` and `stream.pushStream` to demonstrate server push.

## Going Further
- Use `cloudflared tunnel --url http://localhost:3000 --http3` to expose a local HTTP/3 endpoint that terminates QUIC at Cloudflare's edge.
- Alternatively, build `nginx-quic` or use Caddy (v2.6+) with `experimental_http3` enabled to serve the same content over QUIC locally.

## References
- MDN Web Docs — [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- Google Web Fundamentals — [Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2)
- Cloudflare — [What is HTTP/3?](https://www.cloudflare.com/learning/performance/http3/)
- IETF RFC 9114 — [HTTP/3](https://www.rfc-editor.org/rfc/rfc9114)
