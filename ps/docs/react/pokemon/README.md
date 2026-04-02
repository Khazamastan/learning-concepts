# Pokémon Directory (Atomic Design)

## Structure
```
src/
  atoms/
    Button.jsx
    Spinner.jsx
    Table.jsx
  molecules/
    PokemonRow.jsx
  organisms/
    PokemonTable.jsx
  hooks/
    usePokemon.js
  pages/
    PokemonPage.jsx
  App.jsx
  main.jsx
```

## Key Concepts
- **Atomic Design** – Atoms (buttons, spinner, table shell) combine into molecules (`PokemonRow`) and an organism (`PokemonTable`). The page orchestrates layout and controls.
- **Parallel Fetching** – `usePokemon` executes multiple API calls concurrently via `Promise.all`, then sorts results for stable rendering.
- **Reusability** – `usePokemon` exposes `{ data, loading, error, refetch }`, making it portable across pages.
- **Styling** – Atoms ship with local CSS modules for clarity.

## Running the Example
1. Scaffold a Vite React app (`npm create vite@latest`).
2. Copy the `src` directory contents into the project.
3. Install dependencies: `npm install react react-dom prop-types`.
4. Run `npm run dev` and open `http://localhost:5173`.
