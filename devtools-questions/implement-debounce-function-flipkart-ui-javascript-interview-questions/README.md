# Debounce helper

## Problem

Throttle rapid-fire events (like input changes) so the handler only runs once the user pauses for a specified wait time. Optionally invoke the handler at the leading edge.

## Solution

`debounce(fn, wait, options)` keeps a timeout id. Every call clears the previous timer and schedules a new one. If `immediate` is true and no timer exists we execute the callback right away; otherwise we wait until the inactivity window expires.

The demo simulates search box input emitted every 100ms. Only the final value (after the user stops typing) triggers the expensive handler, greatly reducing redundant work.

## Running locally

```bash
cd implement-debounce-function-flipkart-ui-javascript-interview-questions
node src/index.js
```

Observe how the console prints far fewer invocations than raw user input.
