// Minimal URL shortener service using Node.js http module.
const http = require('http');
const crypto = require('crypto');

const STORE = new Map();
const HOST = '127.0.0.1';
const PORT = 8000;

function generateToken(length = 6) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
}

function isValidUrl(candidate) {
  try {
    const parsed = new URL(candidate);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/shorten') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const target = data.url;
        if (!isValidUrl(target)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid URL' }));
          return;
        }
        let token = generateToken();
        while (STORE.has(token)) token = generateToken();
        STORE.set(token, target);
        const shortUrl = `http://${HOST}:${PORT}/${token}`;
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token, shortUrl }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (req.method === 'GET') {
    if (url.pathname === '/') {
      const body = `
        <html>
          <body>
            <h1>MiniShortener</h1>
            <p>POST JSON {"url": "https://example.com"} to /shorten.</p>
          </body>
        </html>`;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
      return;
    }
    const token = url.pathname.slice(1);
    if (STORE.has(token)) {
      res.writeHead(302, { Location: STORE.get(token) });
      res.end();
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`MiniShortener running on http://${HOST}:${PORT}`);
});
