import { useCallback } from 'react';
import PokemonTable from './PokemonTable.jsx';
import { usePokemonList } from '../hooks/usePokemonList.js';
import '../shared/Controls.css';

const DEFAULT_IDS = [1, 4, 7, 25];

export default function PokemonDirectory() {
  const { data, error, ids, refetch, isPending } = usePokemonList(DEFAULT_IDS);

  const handleRandomize = useCallback(() => {
    const randomIds = Array.from({ length: 4 }, () => Math.floor(Math.random() * 151) + 1);
    refetch(randomIds);
  }, [refetch]);

  return (
    <section className="directory">
      <header className="directory__header">
        <h1>Pokémon Directory</h1>
        <div className="directory__actions">
          <button type="button" className="button button--secondary" onClick={handleRandomize}>
            Randomize IDs
          </button>
          <button type="button" className="button button--primary" onClick={() => refetch(ids)}>
            Refetch
          </button>
        </div>
      </header>

      {isPending && <p className="directory__status">Loading…</p>}
      {error && (
        <p role="alert" className="directory__error">
          Failed to load Pokémon data: {error.message || String(error)}
        </p>
      )}

      {data.length > 0 && <PokemonTable pokemon={data} />}
    </section>
  );
}
