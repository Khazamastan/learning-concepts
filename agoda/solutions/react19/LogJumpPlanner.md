# Log Jump Planner (React 19)

- Uses `useActionState` for instant server-safe form handling.  
- Validates the numeric input and surfaces errors inline.  
- Leverages the 1/2/3-step DP recurrence to display the total paths.

## Usage

```jsx
import LogJumpPlanner from "./solutions/react19/LogJumpPlanner.jsx";

export default function App() {
  return <LogJumpPlanner />;
}
```

## React 19 Tie-ins

- `useActionState` keeps form submissions declarative.  
- `useFormStatus` is reused through the shared `SubmitButton` component for ergonomic pending UI.
