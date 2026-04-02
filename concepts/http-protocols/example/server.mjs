import http from 'node:http';
import https from 'node:https';
import http2 from 'node:http2';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error('Missing TLS certificate. Run `node http-protocols/example/generate-cert.mjs` first.');
  process.exit(1);
}

const tlsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
  allowHTTP1: true
};

const responseContent = {
  '/': 'Hello from HTTP/1.1',
  '/secure': 'Hello from HTTPS',
  '/h2': 'Hello from HTTP/2 with server push'
};

function logRequest(protocol, req) {
  console.log(`[${protocol}] ${req.method} ${req.url}`);
}

const httpServer = http.createServer((req, res) => {
  logRequest('http', req);
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end(responseContent[req.url] ?? 'Route not found');
});

const httpsServer = https.createServer(tlsOptions, (req, res) => {
  logRequest('https', req);
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end(responseContent[req.url] ?? 'Secure route not found');
});

const h2Server = http2.createSecureServer(tlsOptions);

h2Server.on('stream', (stream, headers) => {
  const pathHeader = headers[':path'];
  logRequest('http2', { method: headers[':method'], url: pathHeader });

  if (pathHeader === '/h2') {
    stream.respond({ ':status': 200, 'content-type': 'text/plain' });

    stream.pushStream({ ':path': '/h2/push.txt' }, (err, pushStream) => {
      if (err) {
        console.error('Failed to push stream', err);
        return;
      }
      pushStream.respond({ ':status': 200, 'content-type': 'text/plain' });
      pushStream.end('This line was delivered via HTTP/2 server push.');
    });

    stream.end('Welcome to HTTP/2! Check the console for push logs.');
  } else if (pathHeader === '/h2/push.txt') {
    stream.respond({ ':status': 200, 'content-type': 'text/plain' });
    stream.end('Fallback content for clients that do not accept push.');
  } else {
    stream.respond({ ':status': 404 });
    stream.end();
  }
});

httpServer.listen(3000, () => console.log('HTTP server listening on http://localhost:3000'));
httpsServer.listen(3443, () => console.log('HTTPS server listening on https://localhost:3443'));
h2Server.listen(3444, () => console.log('HTTP/2 server listening on https://localhost:3444 (ALPN h2)'));
