import { useEffect, useMemo, useRef, useState, useTransition } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

export default function Autocomplete() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const controllerRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    async function load() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const payload = await response.json();
        setData(payload.results ?? []);
      } catch (cause) {
        if (cause.name !== 'AbortError') {
          setError(cause);
        }
      }
    }

    load();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (input.trim().length === 0) {
      setResults([]);
      return;
    }

    const handler = window.setTimeout(() => {
      startTransition(() => {
        const lower = input.toLowerCase();
        const matches = data
          .map((item) => item.name)
          .filter((name) => name.startsWith(lower))
          .slice(0, 10);
        setResults(matches);
      });
    }, 150);

    return () => window.clearTimeout(handler);
  }, [data, input, startTransition]);

  const stateLabel = useMemo(() => {
    if (error) return 'Error retrieving suggestions';
    if (isPending) return 'Loading suggestions';
    if (results.length === 0 && input) return 'No matches';
    return 'Suggestions ready';
  }, [error, isPending, results.length, input]);

  return (
    <section className="autocomplete" aria-live="polite">
      <label htmlFor="pokemon-search">Search Pokémon</label>
      <input
        id="pokemon-search"
        type="search"
        placeholder="Start typing..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        autoComplete="off"
      />

      <p role="status" className="autocomplete__status">
        {stateLabel}
      </p>

      {error && <p role="alert">{error.message}</p>}

      {results.length > 0 && (
        <ul className="autocomplete__list">
          {results.map((name) => (
            <li key={name}>
              <button type="button" onClick={() => setInput(name)}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
