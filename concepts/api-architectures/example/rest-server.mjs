import express from 'express';
import { products } from './data.mjs';

const app = express();
app.use(express.json());

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.post('/products', (req, res) => {
  const { id, name, price, stock } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: 'id and name are required' });
  }
  products.push({ id, name, price: Number(price) || 0, stock: Number(stock) || 0 });
  res.status(201).json({ message: 'Created', id });
});

const port = 4001;
app.listen(port, () => {
  console.log(`REST API listening on http://localhost:${port}`);
});
