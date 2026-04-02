import express from 'express';
import compression from 'compression';

const app = express();

app.use((req, res, next) => {
  res.setHeader('x-demo-path', req.path);
  next();
});

app.use(
  compression({
    threshold: 0,
    filter: (req, res) => {
      if (req.query.disable === 'true') {
        res.setHeader('x-compression', 'disabled');
        return false;
      }
      res.setHeader('x-compression', 'enabled');
      return compression.filter(req, res);
    }
  })
);

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(80);

app.get('/', (req, res) => {
  res.json({ message: 'Compression demo', length: lorem.length, body: lorem });
});

app.listen(4302, () => {
  console.log('Compression demo listening on http://localhost:4302');
});
