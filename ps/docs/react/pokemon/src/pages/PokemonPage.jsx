import { useState } from 'react';
import Button from '../atoms/Button.jsx';
import Spinner from '../atoms/Spinner.jsx';
import PokemonTable from '../organisms/PokemonTable.jsx';
import { usePokemon } from '../hooks/usePokemon.js';
import './page.css';

const defaultIds = [1, 4, 7, 25];

export default function PokemonPage() {
  const [ids, setIds] = useState(defaultIds);
  const { data, loading, error, refetch } = usePokemon(ids);

  const handleRandomize = () => {
    const randomIds = Array.from({ length: 4 }, () => Math.floor(Math.random() * 151) + 1);
    setIds(randomIds);
  };

  return (
    <section className="page">
      <header className="page__header">
        <h1>Pokémon Directory</h1>
        <div className="page__actions">
          <Button onClick={handleRandomize} variant="secondary">
            Randomize IDs
          </Button>
          <Button onClick={refetch}>Refetch</Button>
        </div>
      </header>

      {loading && <Spinner />}

      {error && (
        <p role="alert" className="page__error">
          Failed to load Pokémon data: {String(error.message || error)}
        </p>
      )}

      {data.length > 0 && <PokemonTable pokemon={data} />}
    </section>
  );
}
