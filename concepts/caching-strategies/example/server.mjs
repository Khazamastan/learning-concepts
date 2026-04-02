import express from 'express';

const app = express();
const versions = new Map();

app.get('/immutable.js', (req, res) => {
  res.setHeader('cache-control', 'public, max-age=31536000, immutable');
  res.type('application/javascript').send(`export const version = 'v1';`);
});

app.get('/revalidate', (req, res) => {
  const etag = 'W/"demo-etag"';
  if (req.get('if-none-match') === etag) {
    res.status(304).end();
    return;
  }
  res.setHeader('cache-control', 'public, max-age=0, must-revalidate');
  res.setHeader('etag', etag);
  res.json({ updatedAt: new Date().toISOString() });
});

app.get('/stale-while-revalidate', (req, res) => {
  res.setHeader('cache-control', 'public, max-age=5, stale-while-revalidate=10');
  const now = Date.now();
  versions.set('value', now);
  res.json({ value: now });
});

app.listen(4301, () => {
  console.log('Caching strategies server on http://localhost:4301');
});
