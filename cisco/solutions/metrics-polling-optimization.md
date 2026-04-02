# Metrics Polling Optimization

## Problem

A metrics dashboard polled every 30 minutes regardless of whether the payload changed, causing redundant renders and unnecessary state updates.

## Solution Overview

- Fetch metrics via an async helper (`fetchMetrics`) and schedule the next poll with `setTimeout` to avoid overlapping timers.
- Store the previously delivered payload in a `useRef`, comparing incoming responses with a lightweight shallow comparison.
- Update React state only when the data actually differs; otherwise keep the existing render tree intact.
- Clear the scheduled timeout during unmount or when the effect stops to prevent memory leaks.

## Key Benefits

1. **Reduced re-renders** — UI updates occur only for meaningful data changes.
2. **Stable scheduling** — A single polling loop simplifies timing and error handling.
3. **Clean teardown** — Timeouts are canceled when the component unmounts, keeping the app resource-friendly.
