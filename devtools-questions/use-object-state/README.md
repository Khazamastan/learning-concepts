# useObjectState Hook

Tiny custom hook that behaves like `setState` from class components—partial updates merge into the existing object, saving you from spreading state manually.

## Usage

```js
import { useObjectState } from "./useObjectState";

function ProfileForm() {
  const [profile, setProfile, resetProfile] = useObjectState({ name: "", email: "" });

  return (
    <form>
      <input
        value={profile.name}
        onChange={(event) => setProfile({ name: event.target.value })}
      />
      <button type="button" onClick={resetProfile}>Reset</button>
    </form>
  );
}
```

- Pass an object to merge fields.
- Pass an updater function to derive partial state from current state.
- `reset()` restores the initial object captured during the first render.

## Project structure

```
use-object-state/
├── index.html
├── package.json
├── src/
│   ├── ObjectStateDemo.jsx
│   ├── index.jsx
│   ├── styles.css
│   └── useObjectState.js
└── vite.config.js
```

## Run locally

```bash
cd use-object-state
npm install
npm run dev
```

Open `http://localhost:5173` to explore the form demo and snapshot history.

## Implementation details

- Stores the initial state in a ref so reset remains stable across renders.
- Uses functional updates to avoid stale closures.
- Keeps API minimal while still allowing advanced patterns (toggling booleans, nested merges).
