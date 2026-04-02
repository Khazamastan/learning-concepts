# PromiseSchedulerDemoReact19 Component

## What Changed for React 19
- Uses `useTransition` to show a pending state while the scheduler resolves, aligning with React 19’s recommended patterns for async updates.
- Adds accessibility hints (`aria-busy`, `role="alert"`) to reflect in-flight work and error states.

## Runtime Steps
1. The component mounts and registers the three jobs.
2. The scheduler begins execution; until results arrive `aria-busy` is `true` and the “Computing job order…” message renders.
3. When `run()` resolves, the state update happens inside `startTransition`, keeping the UI responsive for longer chains of jobs.

## React 19 Integration Tips
- Ensure your project depends on `react@^19.0.0` and `react-dom@^19.0.0`.
- Wrap the component in a `Suspense` boundary if you combine it with streaming or `use`-based data fetches elsewhere.
- Transition boundaries shine when job lists update frequently (e.g., user-triggered orchestrations). For single-shot pipelines you can omit the transition logic.
