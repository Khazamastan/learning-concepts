# Promise Scheduler

This example introduces a small concurrency-aware promise scheduler and a React UI that demonstrates how jobs are queued, executed, paused, and cleared.

## Why a scheduler?

When you fire many asynchronous jobs (API calls, file uploads, background tasks) at once, you often want to limit how many run in parallel to avoid rate limits or resource exhaustion. This scheduler:

- Caps concurrency (`concurrency` option).
- Allows pausing/resuming without losing the queue.
- Returns a promise for each task so callers can await results.
- Provides a `clear` method to cancel queued work.

## Key files

- `src/PromiseScheduler.js` – queue implementation.
- `src/PromiseSchedulerDemo.jsx` – interactive UI showing queued/active tasks.
- `src/styles.css` – styling for the demo.

```
promise-scheduler/
├── index.html
├── package.json
├── src/
│   ├── PromiseScheduler.js
│   ├── PromiseSchedulerDemo.jsx
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Running locally

```bash
cd promise-scheduler
npm install
npm run dev
```

Vite serves the demo at `http://localhost:5173`.

## How the scheduler works

1. `add(task)` places a task (function returning a promise) in the queue and returns a promise to the caller.
2. `_drain()` pulls tasks from the queue while `activeCount < concurrency`.
3. Each task is executed, and `activeCount` is incremented. When it settles, `activeCount` decreases and `_drain()` runs again to pick the next queued task.
4. `pause()` simply stops draining; `start()` resumes execution.
5. `clear()` rejects queued tasks immediately, helping avoid dangling prompts.

The React component wires buttons to these APIs, logging every state transition so the execution order is easy to follow.
