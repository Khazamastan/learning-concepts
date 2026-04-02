# useScript Hook

## Problem
Client applications often need to load third-party scripts (analytics, SDKs) on demand. We must ensure a script loads once, expose loading/error state, and avoid duplicate injections.

## Solution
The `useScript` hook tracks a cache of script statuses keyed by URL. When asked to load a script, it either reuses the cached status or injects a new `<script>` tag and updates the cache on load/error events. Consumers receive the current `status` string (`idle`, `loading`, `ready`, `error`) so they can render UI accordingly. The demo toggles loading for Chart.js to showcase how the state changes.

## Usage
```js
const status = useScript("https://cdn.../library.js");
```

Run the sample with your bundler or copy the hook into an existing React app.
