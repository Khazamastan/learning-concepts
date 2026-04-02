# React 19 Pokémon Directory

- Built with atomic-style separation: `components/PokemonTable.jsx`, `hooks/usePokemonList.js`.
- Uses `useTransition` to keep UI responsive while parallel API calls resolve.
- Supports randomized ID sets and manual refetching.

## Usage
```jsx
import PokemonDirectory from './components/PokemonDirectory.jsx';
import './shared/Controls.css';

export default function Page() {
  return <PokemonDirectory />;
}
```

Copy the `hooks`, `components`, and `shared` directories into your React 19 project and adjust import paths if needed.
