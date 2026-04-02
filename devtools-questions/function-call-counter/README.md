# Function Call Counter

Wraps any function so you can track how often it runs. Useful when debugging memoization, caching, or unexpected re-renders.

## API

```js
import { createCallCounter } from "./callCounter";

const counted = createCallCounter(expensiveFn);
counted(); // run #1
counted(); // run #2

console.log(counted.getCount()); // 2
counted.reset();
```

## Demo

Interactive UI includes sample operations (add to cart, format currency, generate IDs). Each button click increments the associated counter and logs output.

## Structure

```
function-call-counter/
├── index.html
├── package.json
├── src/
│   ├── CallCounterDemo.jsx
│   ├── callCounter.js
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd function-call-counter
npm install
npm run dev
```

Open `http://localhost:5173` and click around to see invocation counts climb.
