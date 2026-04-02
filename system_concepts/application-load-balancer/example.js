// Demo application load balancer with two backend services in Node.js.
const http = require('http');

const BACKENDS = ['http://127.0.0.1:9001', 'http://127.0.0.1:9002'];
let pointer = 0;

function nextBackend() {
  const target = BACKENDS[pointer % BACKENDS.length];
  pointer += 1;
  return target;
}

function startBackend(port) {
  const server = http.createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
      return;
    }
    const payload = JSON.stringify({
      message: `Hello from backend on port ${port}`,
      path: req.url,
    });
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    });
    res.end(payload);
  });
  server.listen(port, () => {
    console.log(`Backend listening on http://127.0.0.1:${port}`);
  });
  return server;
}

function startProxy() {
  const server = http.createServer((clientReq, clientRes) => {
    const backend = new URL(nextBackend());
    const options = {
      hostname: backend.hostname,
      port: backend.port,
      path: clientReq.url,
      method: clientReq.method,
      headers: {
        ...clientReq.headers,
        host: backend.host,
      },
    };

    const proxyReq = http.request(options, (backendRes) => {
      clientRes.writeHead(backendRes.statusCode || 500, {
        ...backendRes.headers,
        'X-Upstream-Host': backend.host,
      });
      backendRes.pipe(clientRes, { end: true });
    });

    proxyReq.on('error', (err) => {
      clientRes.writeHead(502, { 'Content-Type': 'application/json' });
      clientRes.end(JSON.stringify({ error: err.message }));
    });

    clientReq.pipe(proxyReq, { end: true });
  });

  server.listen(8080, () => {
    console.log('Proxy listening on http://127.0.0.1:8080');
  });
}

startBackend(9001);
startBackend(9002);
startProxy();
