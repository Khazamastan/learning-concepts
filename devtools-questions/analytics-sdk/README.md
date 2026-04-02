# Analytics SDK in JavaScript

Tiny analytics client that batches events and sends them to an endpoint with configurable flush intervals.

## API

```js
import { AnalyticsSDK } from "./AnalyticsSDK";

const analytics = new AnalyticsSDK({ endpoint: "/analytics", flushInterval: 3000 });
analytics.track("button_click", { label: "signup" });
await analytics.flush(); // send immediately
```

## Demo

`src/AnalyticsDemo.jsx` uses a mock fetch to log batched payloads in the UI. Adjust payloads, toggle failure, and watch automatic flushes.

## Run locally

```bash
cd analytics-sdk
npm install
npm run dev
```

Go to `http://localhost:5173`.
