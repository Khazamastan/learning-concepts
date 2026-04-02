# React Error Boundaries

## Use Cases
- Catch runtime errors during render, lifecycle methods, and constructors.
- Display fallback UI rather than breaking the entire React tree.
- Log errors to monitoring services (Sentry, Datadog) inside `componentDidCatch`.

## Limitations
- Do not catch errors in event handlers, async callbacks, or server rendering. Use `try/catch` or `window.onerror` for those cases.

## Usage
```jsx
import { ErrorBoundary } from './error-boundary.jsx';

function App() {
  return (
    <ErrorBoundary fallback={<p>Fallback UI</p>} onError={(err) => console.error(err)}>
      <RiskyComponent />
    </ErrorBoundary>
  );
}
```
