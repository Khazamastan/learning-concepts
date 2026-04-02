# Solutions Workspace

This directory contains self-contained JavaScript examples for the requested React topics. Each solution ships with:

- `*.js` — the runnable component or demo logic.
- `*.md` — background notes on the problem, the applied optimization, and key takeaways.

## Prerequisites

- Node.js 18+ (to match current React tooling defaults).
- A React build tool such as [Vite](https://vitejs.dev), [Next.js](https://nextjs.org), or [Create React App](https://create-react-app.dev/).

## Running A Component

1. Create (or reuse) a React project:
   ```bash
   npm create vite@latest my-demo -- --template react
   cd my-demo
   npm install
   ```

2. Copy the desired `.js` file from this `solutions` folder into your project’s `src/` directory (rename to `.jsx` or `.tsx` if your tooling expects it).

3. Import the component into your app entry point:
   ```jsx
   import ParentComponent from './expensive-calculation-optimization';

   export default function App() {
     return <ParentComponent />;
   }
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open the listed localhost URL to interact with the example.

## Files Overview

- `expensive-calculation-optimization.*` — Optimized parent/child rendering with memoized computations.
- `memoized-list-optimization.*` — Efficient list rendering with stable derived data.
- `array-cloning-behavior.*` — Demonstrates shallow vs deep cloning of nested data.
- `error-boundary-example.*` — Implements a reusable error boundary with retry UI.
- `ping-pong-counter.*` — Counter that oscillates between 0 and 10 with play/pause/reset controls.
- `metrics-polling-optimization.*` — Polls metrics every 30 minutes, re-rendering only on data changes.

Refer to each accompanying `.md` file for deeper explanation and rationale.

## React 19 Variants

Looking for React 19-specific implementations that showcase new hooks (`use`, `useDeferredValue`, `useEffectEvent`, `useActionState`)? Check the `react19/` subdirectory for parallel examples plus detailed notes.
