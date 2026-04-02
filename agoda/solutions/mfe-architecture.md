# Micro-Frontend Architecture

## Goals

- Allow independent teams to deploy UI slices without coordinating shared releases.  
- Localize failures to a single slice.  
- Share a common shell for routing, auth, design systems.

## Shell Contract (see `mfe-architecture.js`)

- `registerMicroFrontend(name, loader)` keeps a registry of lazy loaders.  
- `mountMicroFrontend(name, container, props)` resolves the loader, calls its `mount` function, and returns a cleanup callback.  
- `unregisterMicroFrontend(name)` removes stale entries (helpful in development).

### Remote Side

Each remote bundle should export:

```js
export function mount(container, props) {
  const app = createRoot(container);
  app.render(<RemoteApp {...props} />);
  return () => app.unmount();
}
```

## Composition Choices

- **Routing:** app-shell handles top-level routes, delegates to micro-frontends.  
- **Shared packages:** use Module Federation shared singletons or a private registry.  
- **Communication:** emit custom events, use shared state libraries, or message bus (e.g., BroadcastChannel).  
- **Version control:** independent repos or a monorepo with ownership boundaries.

## Operational Considerations

- Per-slice CI/CD pipelines with contract tests.  
- UX consistency enforced by a shared component library.  
- Observability hooks to tag metrics/events with `microFrontendName`.  
- Feature flags scoped per slice, but visible centrally.

## When to Use

- Multiple teams shipping large surfaces in parallel.  
- Need for gradual rewrites while keeping legacy modules alive.  
- Separate cadence or regulatory boundaries per slice.
