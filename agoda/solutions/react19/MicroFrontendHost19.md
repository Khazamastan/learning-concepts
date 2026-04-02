# Micro-Frontend Host (React 19)

- Demonstrates using the new `use(promise)` API to await remote manifests at render time.  
- Each remote exposes a `mount`-style function returning a component; the host wraps it in `Suspense` for graceful loading states.

## Usage

```jsx
import MicroFrontendHost19 from "./solutions/react19/MicroFrontendHost19.jsx";

export default function App() {
  return <MicroFrontendHost19 />;
}
```

Provide your own manifest promise if you have a runtime loader:

```jsx
const manifestPromise = fetch("/mf-manifest.json").then((res) => res.json());
<MicroFrontendHost19 manifestPromise={manifestPromise} />;
```

## React 19 Notes

- `use` can unwrap promises inside Client Components, aligning with the federated module loading workflow.  
- Works with Module Federation, ESM dynamic imports, or any promise-based loader.  
- Pair with `Suspense` boundaries to keep the shell responsive.
