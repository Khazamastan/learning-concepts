# PromiseSchedulerDemo Component

## Purpose
Demonstrates how to drive the promise scheduler from a React component so the resolved job order renders in the UI. Useful when orchestrating data-fetch pipelines where later fetches depend on earlier responses.

## Lifecycle
- The demo runs inside a `useEffect` hook so jobs execute once after the component mounts.
- Resolved values populate local state via `setOutput`, triggering the list render.
- Any scheduler error (dependency mismatch or promise rejection) surfaces in the UI by updating the `error` state.

## JSX Output
The component renders:
1. An `<h1>` heading describing the demo.
2. An unordered list of resolved job results (`user`, `profile`, `session` with the provided setup).

## Integration Tips
- Replace the `Promise.resolve` callbacks with real fetchers (`fetch`, `axios`, custom SDKs).
- Co-locate job registration logic with feature-specific data modules, then import them into the component.
- When executing multiple independent pipelines, instantiate separate `task` objects to keep state isolated.
