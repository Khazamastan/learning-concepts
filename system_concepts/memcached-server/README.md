# Memcached Server Concept Guide

## Concept Overview
Memcached is a distributed, in-memory key/value cache designed for speed and simplicity. It exposes a text (and optional binary) protocol supporting commands such as `get`, `set`, `add`, `replace`, `delete`, and `increment`. Servers store data in slabs to reduce fragmentation and use LRU eviction when memory is exhausted. Clients typically shard requests across a pool of servers using consistent hashing.

## Real-World Usage
- **Facebook / Twitter:** Cache database query results and session data to reduce backend load.
- **CDNs:** Edge applications cache templated fragments to avoid recomputing responses per request.
- **E-commerce:** Product catalogs and cart state are cached to ensure low-latency page loads.

## Architecture Highlights
1. **Memory Management:** Slab allocator pre-allocates chunks of fixed sizes and places items into the smallest slab that fits.
2. **Protocol:** ASCII requests follow `command key flags exptime bytes` syntax terminated with `\r\n`. The binary protocol adds pipelining and structured headers.
3. **Distribution:** Clients use consistent hashing (ketama) or proxy-based routing (mcrouter) to spread keys across servers.
4. **Eviction:** LRU or per-slab tail eviction removes the least recently used items when slabs are full.

## Included Working Example (Node.js)
The `example.js` script provides a toy ASCII Memcached server that supports `set`, `get`, `delete`, and `incr` commands. Run it and interact with `nc`:

```bash
node example.js
printf 'set counter 0 0 1\r\n1\r\n' | nc 127.0.0.1 11211
printf 'incr counter 1\r\n' | nc 127.0.0.1 11211
printf 'get counter\r\n' | nc 127.0.0.1 11211
```

## React 19 Interactive Demo
`example.jsx` offers a browser-based Memcached playground:

```jsx
import MemcachedDemo from "./memcached-server/example.jsx";

export default function App() {
  return <MemcachedDemo />;
}
```

It handles `set`, `get`, `incr`, and `delete` commands with TTL awareness, making it easy to demo cache semantics visually.

## Learning Checklist
- Implement slab allocation and LRU eviction.
- Add the binary protocol and multi-key `gets` with CAS tokens.
- Integrate a consistent-hash client that shards keys across multiple instances.

## References
- Memcached Documentation: https://memcached.org/about
- Facebook Engineering – Scaling Memcached at Facebook: https://www.facebook.com/notes/facebook-engineering/scaling-memcache-at-facebook/
- MCrouter Overview: https://github.com/facebook/mcrouter
