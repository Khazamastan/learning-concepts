import express from 'express';

const app = express();
let latestTick = Date.now();

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const interval = setInterval(() => {
    latestTick = Date.now();
    res.write(`data: ${JSON.stringify({ type: 'tick', timestamp: latestTick })}\n\n`);
  }, 2000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.get('/snapshot', (req, res) => {
  res.json({ timestamp: latestTick });
});

app.listen(4100, () => {
  console.log('SSE server running on http://localhost:4100/stream');
  console.log('Snapshot endpoint available at http://localhost:4100/snapshot');
});
