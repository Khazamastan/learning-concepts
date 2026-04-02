# Promisify Polyfill

Implementation of Node.js-style `util.promisify`. Converts functions expecting a `(err, result)` callback into ones returning promises.

## API

```js
import { promisify } from "./promisify";

const readFileAsync = promisify(fs.readFile);
const data = await readFileAsync("package.json", "utf8");
```

## Demo

`src/PromisifyDemo.jsx` wraps a fake callback-based API and exposes a UI to toggle success/failure.

## Run locally

```bash
cd promisify-polyfill
npm install
npm run dev
```

Go to `http://localhost:5173` and test the promisified function.
