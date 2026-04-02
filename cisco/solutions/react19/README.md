# React 19 Variants

This folder mirrors the main `solutions/` examples but adapts each one to React 19 features such as `use`, `useEffectEvent`, `useDeferredValue`, and `useActionState`.

## Files

- `expensive-calculation-optimization.react19.js` — Suspense-driven calculation using the new `use` hook to unwrap async data.
- `memoized-list-optimization.react19.js` — List rendering with `useDeferredValue` for smoother transitions.
- `array-cloning-behavior.react19.js` — Demonstrates `structuredClone` for deep copies.
- `error-boundary-example.react19.js` — Error boundary paired with a Server Action via `useActionState`.
- `ping-pong-counter.react19.js` — Counter that relies on `useEffectEvent` and transitions for smooth updates.
- `metrics-polling-optimization.react19.js` — Polling loop managed through `useEffectEvent`.

Each component has a matching `.md` explainer describing the React 19–specific considerations.

## Running The Examples

1. Install React 19 (or a compatible release candidate) and a bundler that supports the new hooks. Example with Vite:
   ```bash
   npm create vite@latest react19-demo -- --template react-swc
   cd react19-demo
   npm install react@19 react-dom@19
   ```

2. Copy the desired `.react19.js` file into `src/` and ensure your tooling allows the corresponding features (e.g., enable Suspense on the client, Server Actions if required).

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open the rendered page and interact with the component. If your environment lacks support for a particular hook (e.g., `useEffectEvent`), fall back to the non-React-19 version in the parent directory.
