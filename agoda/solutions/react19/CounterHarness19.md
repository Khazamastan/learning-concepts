# Counter Harness (React 19)

- Mirrors the Counter example used in Jest/RTL guides, but implemented with React 19 actions.  
- `useOptimistic` keeps the UI snappy while the action resolves.  
- Perfect for demonstrating white/black/grey-box tests with React Testing Library.

## Usage

```jsx
import CounterHarness19 from "./solutions/react19/CounterHarness19.jsx";

export default function Playground() {
  return <CounterHarness19 />;
}
```

## Testing Tips

- Use RTL queries (`getByLabelText("counter-value")`) to assert on the rendered output.  
- Spy on the form action when unit testing to ensure parameters (step/direction) are passed correctly.
