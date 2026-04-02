# Measure Function Execution Time

Utility helpers for timing synchronous and asynchronous functions with millisecond precision, accompanied by an interactive demo comparing algorithm runtimes.

## API

```js
import { measure } from "./measure";

const { result, duration } = await measure(fetchUsers, [], { async: true });
console.log(`Completed in ${duration.toFixed(2)}ms`);
```

- `measure(fn, args, options)` returns `{ label, duration, result }`.
- Options: `label` (string override) and `async` (boolean flag for promise-returning functions).
- `measureMultiple(samples)` runs a list of `{ fn, args, options }`.

## Demo

Pick from built-in tasks (recursive Fibonacci, dynamic programming, array sort, async wait), tweak the input size, and record duration logs.

## Structure

```
measure-function-execution-time/
├── index.html
├── package.json
├── src/
│   ├── MeasureDemo.jsx
│   ├── index.jsx
│   ├── measure.js
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd measure-function-execution-time
npm install
npm run dev
```

Browse to `http://localhost:5173`.

## Notes

- Uses `performance.now()` for sub-millisecond resolution.
- Async measurements await completion in a `Promise.race`-free manner to capture full duration.
- Extend with custom scenarios by adding tasks to `TASKS` list in `MeasureDemo.jsx`.
