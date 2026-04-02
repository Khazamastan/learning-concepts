// HTTP server with token-bucket rate limiting implemented in Node.js.
const http = require('http');

const RATE = 5;
const INTERVAL = 10_000; // milliseconds

class TokenBucket {
  constructor(rate, interval) {
    this.capacity = rate;
    this.tokens = rate;
    this.interval = interval;
    this.lastRefill = Date.now();
  }

  allow() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    if (elapsed > 0) {
      const refill = (elapsed / this.interval) * this.capacity;
      if (refill > 0) {
        this.tokens = Math.min(this.capacity, this.tokens + refill);
        this.lastRefill = now;
      }
    }
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return { allowed: true, retryAfter: 0 };
    }
    const wait = this.interval - (elapsed % this.interval);
    return { allowed: false, retryAfter: Math.ceil(wait / 1000) };
  }
}

const bucket = new TokenBucket(RATE, INTERVAL);

const server = http.createServer((req, res) => {
  const { allowed, retryAfter } = bucket.allow();
  if (!allowed) {
    res.writeHead(429, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Retry-After': String(retryAfter),
    });
    res.end('Rate limit exceeded. Try again later.\n');
    return;
  }

  const body = `
    <html>
      <body>
        <h1>Hello!</h1>
        <p>Remaining tokens: ${bucket.tokens.toFixed(2)}</p>
        <p>Rate: ${RATE} requests every ${INTERVAL / 1000} seconds.</p>
      </body>
    </html>
  `;
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
});

server.listen(5000, '127.0.0.1', () => {
  console.log(`Rate-limited server listening on http://127.0.0.1:5000 (${RATE}/${INTERVAL / 1000}s)`);
});
