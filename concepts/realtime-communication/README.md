# WebSockets, Server-Sent Events, Polling

## Overview
Real-time delivery patterns provide different trade-offs for bi-directional and uni-directional communication between clients and servers.
- **WebSockets** upgrade an HTTP connection to a persistent, full-duplex channel suitable for chat, multiplayer games, and collaborative editors.
- **Server-Sent Events (SSE)** keep a single long-lived HTTP response open and stream text/event-stream messages from server to client; ideal for dashboards and live feeds where the client only needs server-to-client updates.
- **Long Polling / Short Polling** repeatedly issues HTTP requests to fetch state changes. Although easy to implement, it is less efficient because it incurs request overhead and latency between polls.

## Choosing a Strategy
- **Bi-directional messaging**: choose WebSockets.
- **Server-to-client streams behind proxies**: pick SSE (works over HTTP/1.1, friendly with HTTP reverse proxies).
- **Legacy or limited environments**: fall back to polling when persistent connections are restricted.

## Real-World Example
A live sports score site can broadcast scoring events via SSE to browsers while the mobile app uses WebSockets for bidirectional chat. As a fallback, older embedded devices poll an endpoint every 30 seconds.

## Working Example (This Repository)
This folder contains:
1. `websocket-server.mjs` and `websocket-client.mjs`: a WebSocket echo server plus a CLI client.
2. `sse-server.mjs`: Express endpoint streaming timestamped updates (open `http://localhost:4100/stream`).
3. `polling-client.mjs`: demonstrates short polling against the same SSE feed by hitting `/snapshot` every five seconds.

### Run the demos
1. `npm install` (once at repo root).
2. Start the WebSocket server: `npm run start:realtime:websocket` (port `4101`). Optional: in another terminal run `npm run start:realtime:websocket-client` and type messages.
3. Start the SSE server: `npm run start:realtime:sse` (`http://localhost:4100/stream`).
4. Run the polling client: `npm run start:realtime:poll` to see periodic fetches.

## References
- MDN — [Using WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_server)
- HTML Living Standard — [Server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- Google Developers — [Long polling and WebSockets](https://developers.google.com/web/fundamentals/design-and-ux/modern-web-platform/socket-realtime)
