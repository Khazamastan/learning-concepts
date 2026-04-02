# Platform Scheduler (React 19)

- Accepts newline-delimited arrival/departure times.  
- Parses inputs via the greedy overlap algorithm to compute minimum platforms.  
- Relies on `useActionState` and `useFormStatus` to keep the submission declarative.

## Usage

```jsx
import PlatformScheduler from "./solutions/react19/PlatformScheduler.jsx";

export default function App() {
  return <PlatformScheduler />;
}
```

## React 19 Notes

- `useActionState` simplifies form handling for both client and server components.  
- Works seamlessly with the new Form Actions model introduced in React 19.
