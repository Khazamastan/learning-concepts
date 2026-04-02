# Planes Shot Calculator (React 19)

- Uses `useActionState` for progressive form submissions.  
- `useFormStatus` disables the submit button while pending.  
- Reuses the greedy interval algorithm to compute the minimum shots.

## Usage

```jsx
import PlanesShotCalculator from "./solutions/react19/PlanesShotCalculator.jsx";

export default function App() {
  return <PlanesShotCalculator />;
}
```

Each line of the textarea accepts `start-end` (or `start,end`). Validation errors surface inline through the returned action state.

## React 19 Notes

- `useActionState` allows forms to manage async workflows without extra state variables.  
- `useFormStatus` reads the surrounding form submission status and keeps the UI responsive.  
- Works with streaming/Server Components if you upgrade the runtime to React 19.
