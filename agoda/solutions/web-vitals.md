# Web Vitals (LCP, INP, CLS)

## Metrics

- **LCP (Largest Contentful Paint):** measures loading speed of the main content. Target ≤ 2.5s.  
- **INP (Interaction to Next Paint):** replaces FID; captures worst-case interaction latency. Target ≤ 200ms.  
- **CLS (Cumulative Layout Shift):** visual stability score. Target ≤ 0.1.

## Reporter (`web-vitals.js`)

`createWebVitalsReporter(send)` hooks into `onLCP`, `onINP`, and `onCLS` from the `web-vitals` package and forwards metrics to the provided `send` callback with the metric name, value, rating, delta, and id.

### Usage

```js
import { createWebVitalsReporter } from "./web-vitals";

createWebVitalsReporter((metric) => {
  fetch("/analytics", {
    method: "POST",
    keepalive: true,
    body: JSON.stringify(metric),
    headers: { "Content-Type": "application/json" },
  });
});
```

## Optimization Checklist

- Preload hero images and critical CSS to improve LCP.  
- Avoid long tasks (>50ms) on the main thread; move work to web workers for better INP.  
- Reserve layout space for ads/media, and preload fonts to reduce CLS.

## Monitoring

- Segment metrics by device and connection type.  
- Set performance budgets that fail CI when regressions exceed thresholds.  
- Pair field data (real users) with lab data (Lighthouse/WebPageTest) for root cause analysis.
