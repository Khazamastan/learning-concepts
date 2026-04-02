import express from 'express';
const app = express();

const placeholder = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFqAL/2uEwuQAAAABJRU5ErkJggg==',
  'base64'
);

app.get('/', (req, res) => {
  const geo = req.get('cf-ipcountry') ?? '??';
  res.setHeader('cache-control', 'public, max-age=300, stale-while-revalidate=300');
  res.setHeader('surrogate-control', 'max-age=600');
  res.setHeader('x-debug-geo', geo);
  res.json({
    message: 'Edge delivery demo',
    geo,
    note: 'Imagine this JSON cached at the CDN edge with surrogate keys.'
  });
});

app.get('/hero.png', (req, res) => {
  res.setHeader('cache-control', 'public, max-age=31536000, immutable');
  res.type('image/png').send(placeholder);
});

app.get('/purge', (req, res) => {
  res.setHeader('cache-control', 'no-store');
  res.json({ status: 'Purge request would trigger surrogate key invalidation.' });
});

const port = process.env.PORT || 4300;
app.listen(port, () => {
  console.log(`CDN edge simulator listening on http://localhost:${port}`);
});
