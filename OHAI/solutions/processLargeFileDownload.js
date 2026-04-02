'use strict';

const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
const { pipeline } = require('node:stream/promises');

function createDownloadServer({ fileRoot }) {
  const root = path.resolve(fileRoot);
  return http.createServer(async (req, res) => {
    const match = req.url.match(/^\/downloads\/(.+)$/);
    if (req.method !== 'GET' || !match) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const requestedFile = path.join(root, match[1]);
    const safePath = path.resolve(requestedFile);
    if (!safePath.startsWith(root) || !fs.existsSync(safePath)) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${path.basename(safePath)}"`,
    });

    const fileStream = fs.createReadStream(safePath);
    try {
      await pipeline(fileStream, res);
    } catch (error) {
      console.error('Streaming error:', error);
      if (!res.headersSent) {
        res.statusCode = 500;
      }
      res.end();
    }
  });
}

async function downloadLargeFile({ url, destination }) {
  const protocol = url.startsWith('https') ? https : http;

  await fs.promises.mkdir(path.dirname(destination), { recursive: true });

  await new Promise((resolve, reject) => {
    const request = protocol.get(url, (response) => {
      if (response.statusCode && response.statusCode >= 400) {
        reject(new Error(`Request failed with status ${response.statusCode}`));
        response.resume();
        return;
      }

      const writeStream = fs.createWriteStream(destination);
      pipeline(response, writeStream)
        .then(resolve)
        .catch(reject);
    });

    request.on('error', reject);
  });
}

function exampleUsage() {
  const fileRoot = path.resolve(__dirname, '..', 'large-files');
  console.log('Example REST endpoint: GET http://localhost:3000/downloads/:fileName');
  console.log('Example server setup:');
  console.log('  const server = createDownloadServer({ fileRoot: "' + fileRoot + '" });');
  console.log('  server.listen(3000);');
  console.log('Example download logic:');
  console.log('  await downloadLargeFile({');
  console.log('    url: "http://localhost:3000/downloads/dataset.bin",');
  console.log('    destination: path.resolve("./downloads/dataset.bin"),');
  console.log('  });');
  console.log('Streaming keeps memory usage low even for 1 GB files.');
}

if (require.main === module) {
  exampleUsage();
}

module.exports = { createDownloadServer, downloadLargeFile };
