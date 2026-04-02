# Testing Strategy Dashboard (React 19)

- Interactive calculator for the 70/20/10 testing split.  
- Adjust the total planned cases to see how many belong to each layer.  
- Embed into onboarding docs or engineering dashboards.

## Usage

```jsx
import TestingStrategyDashboard19 from "./solutions/react19/TestingStrategyDashboard19.jsx";

export default function QAPlan() {
  return <TestingStrategyDashboard19 />;
}
```

Extend the component to surface CI coverage thresholds or incident history per layer.
