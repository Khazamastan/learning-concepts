# React 19 Autocomplete

- Uses `useTransition` to keep input responsive while filtering.
- Debounces keystrokes with a `setTimeout` cleanup.
- Fetches the Pokémon list once on mount and aborts in-flight requests.
- Exposes selection via buttons for mouse/touch accessibility.

## Using in React 19
```jsx
import Autocomplete from './Autocomplete.jsx';
import './Autocomplete.css';

export default function Page() {
  return <Autocomplete />;
}
```
