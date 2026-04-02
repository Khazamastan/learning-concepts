# React Concurrency

## What the Example Shows

- `useTransition` marks result loading as a low-priority update.  
- Typing stays responsive because urgent updates (input value) render first.  
- `Suspense` wraps the asynchronous list, displaying a fallback while React resolves the resource.  
- The render phase remains pure; only the commit phase mutates the DOM, preserving consistency even when work is interrupted.

## How Concurrent Rendering Works

- React maintains a fiber tree with lanes (priority buckets).  
- The scheduler splits rendering into small chunks and yields back to the browser between slices.  
- If a higher-priority update (like typing) arrives, React can pause, abandon, or restart in-flight work.  
- Only when work conv erges does React enter the commit phase, batching DOM mutations synchronously.

## When to Reach for Concurrency

- Expensive components that should not block user input.  
- Streaming data (use `Suspense` boundaries).  
- Progressive hydration of server-rendered UIs.  
- Coordinating transitions between navigation states.

## Tips

- Use `startTransition` for state updates that can lag behind (search results, filters, charts).  
- Pair with `useDeferredValue` when you cannot wrap the source update.  
- Track `isPending` to show optimistic indicators.  
- Avoid side effects inside the render phase; keep data fetching in framework-specific hooks (e.g., RSC, loaders).

## Example Hook Contract

`fetchResults` should return an object with a `read()` method (resource pattern) that either returns data or throws a promise to trigger `Suspense`.
