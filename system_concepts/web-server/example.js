// Minimal web server with routing and static file support using Node.js.
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
const STATIC_DIR = path.join(BASE_DIR, 'static');

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function serveStatic(filePath, res) {
  const fullPath = path.join(STATIC_DIR, filePath);
  if (!fullPath.startsWith(STATIC_DIR) || !fs.existsSync(fullPath)) {
    send(res, 404, '<h1>404 Not Found</h1>', { 'Content-Type': 'text/html; charset=utf-8' });
    return;
  }
  const data = fs.readFileSync(fullPath);
  const ext = path.extname(fullPath);
  const contentType = ext === '.txt' ? 'text/plain; charset=utf-8' : 'application/octet-stream';
  send(res, 200, data, { 'Content-Type': contentType });
}

function indexPage() {
  return `
    <html>
      <head><title>Mini Web Server</title></head>
      <body>
        <h1>Mini Web Server</h1>
        <p>This example illustrates routing, JSON output, and static files.</p>
        <ul>
          <li><a href="/api/time">Current time (JSON)</a></li>
          <li><a href="/static/hello.txt">Download static file</a></li>
        </ul>
      </body>
    </html>
  `;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method !== 'GET') {
    send(res, 405, '<h1>405 Method Not Allowed</h1>', { 'Content-Type': 'text/html; charset=utf-8' });
    return;
  }

  if (url.pathname === '/') {
    const body = indexPage();
    send(res, 200, body, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
    return;
  }

  if (url.pathname === '/api/time') {
    const payload = JSON.stringify({ iso: new Date().toISOString(), epoch: Math.floor(Date.now() / 1000) });
    send(res, 200, payload, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) });
    return;
  }

  if (url.pathname.startsWith('/static/')) {
    serveStatic(url.pathname.replace('/static/', ''), res);
    return;
  }

  send(res, 404, '<h1>404 Not Found</h1>', { 'Content-Type': 'text/html; charset=utf-8' });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8081;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Serving on http://127.0.0.1:${PORT}`);
});
