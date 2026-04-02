# Timeout-Based API Wrapper with Optional Retry

Utility for wrapping promise-returning network calls with a timeout and configurable retry policy. Includes an interactive playground to simulate different latency/failure scenarios.

## API

```js
import { requestWithTimeout } from "./apiWrapper";

const data = await requestWithTimeout(() => fetch("/api/users"), {
  timeout: 2000,
  retries: 2,
  retryDelay: 300,
});
```

Options:

- `timeout` (ms) – maximum time before rejecting.
- `retries` – number of retry attempts on failure/timeout.
- `retryDelay` (ms) – wait time between retries.

## Structure

```
timeout-api-wrapper/
├── index.html
├── package.json
├── src/
│   ├── TimeoutApiDemo.jsx
│   ├── apiWrapper.js
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd timeout-api-wrapper
npm install
npm run dev
```

Visit `http://localhost:5173` to drive the simulator.

## Implementation notes

- `requestWithTimeout` races the provided request against a rejection timer; failed attempts queue retries with optional delay.
- Playground scenarios emulate success, failure, and slow responses without depending on live APIs.
- Logs capture status, attempt count, and response payload to illustrate behavior.
