# Web Vitals Overview

| Metric | Target | Measures | Improvements |
| --- | --- | --- | --- |
| Largest Contentful Paint (LCP) | < 2.5 s | Time to render main content | Optimize hero images, server render critical HTML, use CDN |
| Interaction to Next Paint (INP) | < 200 ms | Responsiveness to user input | Reduce long tasks, split bundles, prefer `requestIdleCallback` for heavy work |
| Cumulative Layout Shift (CLS) | < 0.1 | Visual stability | Reserve space with width/height attributes, avoid inserting early ads, use `transform` instead of `top/left` |
| First Contentful Paint (FCP) | < 1.8 s | Time to first pixel | Preload critical CSS, inline render-blocking styles |
| Time to First Byte (TTFB) | < 0.8 s | Server responsiveness | Edge caching, database query optimization |

## Measuring in the Field
1. Import the [`web-vitals`](https://github.com/GoogleChrome/web-vitals) package and send metrics to analytics.
2. Use Chrome User Experience Report (CrUX) to benchmark vs real-user data.
3. Set up a Real User Monitoring (RUM) endpoint to track regressions over time.

## Sample RUM Snippet
```js
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics(metric) {
  navigator.sendBeacon('/analytics', JSON.stringify(metric));
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```
