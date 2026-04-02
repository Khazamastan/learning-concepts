# ComposeAsync

Utility helpers for composing asynchronous functions. Includes both classical right-to-left composition (`composeAsync`) and left-to-right piping (`pipeAsync`), plus an interactive React playground.

## Why?

Promise chains can become unwieldy when you need to reuse the same sequence of transformations. Function composition lets you describe the pipeline declaratively. This project:

- Validates inputs and ensures each step’s return value is wrapped in `Promise.resolve`, so synchronous and asynchronous functions mix seamlessly.
- Provides both composition directions to match personal preference.
- Visualises execution order with simulated async operations.

## Files

```
compose-async/
├── index.html
├── package.json
├── src/
│   ├── composeAsync.js
│   ├── ComposeAsyncDemo.jsx
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd compose-async
npm install
npm run dev
```

Open `http://localhost:5173` to try the playground.

## Usage example

```js
import { composeAsync } from "./composeAsync";

const pipeline = composeAsync(
  async (value) => value.trim(),
  async (value) => value.toUpperCase(),
  async (value) => `${value}!`,
);

pipeline("   hello world   ").then(console.log); // → "HELLO WORLD!"
```

## Implementation details

- Composition is implemented via `Array.prototype.reduceRight`, seeding with `Promise.resolve(input)`.
- The demo shows each asynchronous step executing in series, logging start and completion messages so the order is obvious.
- Because each step is wrapped in `Promise.resolve`, the pipeline tolerates synchronous helpers without additional effort.
