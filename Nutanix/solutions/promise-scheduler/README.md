# Promise Scheduler Solutions

This folder contains a reusable promise scheduler plus a simple React demo that showcases the execution order. Follow the steps below to run everything locally.

## Prerequisites
- Node.js 18 or later
- npm (comes with Node) or your preferred package manager

## Quick Start
Because this folder ships only the scheduler logic and demo component, plug them into an existing React toolchain (Vite, Create React App, Next.js, etc.) to run them.

1. Copy `promiseScheduler.js` and `PromiseSchedulerDemo.js` into your React project (for example under `src/lib/` and `src/components/`).
2. Export `PromiseSchedulerDemo` from one of your routes or pages.
3. Start your normal dev server (`npm run dev`, `npm start`, or framework-equivalent).
4. Visit the route that renders `PromiseSchedulerDemo` to see the list `user → profile → session`.

Alternatively, to run without React, import `createTask` into any Node script:
```bash
node -e "const { createTask } = require('./promiseScheduler.js'); const t = createTask(); t.addJob('loadUser', () => Promise.resolve('user')); t.run().then(console.log);"
```

## File Layout
- `promiseScheduler.js` — the dependency-aware scheduler logic.
- `PromiseSchedulerDemo.js` — React component for React 18-era projects.
- `PromiseSchedulerDemo.react19.jsx` — React 19-friendly variant that exposes transition state.
- `promiseScheduler.md` — detailed explanation of the scheduler implementation.
- `PromiseSchedulerDemo.md` — walkthrough of the React integration.
- `PromiseSchedulerDemo.react19.md` — notes specific to the React 19 version.

## Integrating Elsewhere
- Import `createTask` into any React or vanilla JS project to drive your own asynchronous orchestration.
- Replace the placeholder promises with real async calls (fetching APIs, reading local caches, etc.).
- Consider moving shared scheduler logic into your project’s utilities folder and writing unit tests around `createTask`.
