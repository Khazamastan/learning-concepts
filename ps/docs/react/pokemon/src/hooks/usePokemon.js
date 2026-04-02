import { useCallback, useEffect, useState } from 'react';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

export function usePokemon(ids) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = useCallback(async () => {
    if (Array.isArray(ids) === false || ids.length === 0) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const requests = ids.map((id) => fetch(baseUrl + id).then((response) => response.json()));
      const results = await Promise.all(requests);
      const sorted = results.sort((a, b) => a.id - b.id);
      setData(sorted);
    } catch (cause) {
      setError(cause);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [ids]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return { data, loading, error, refetch: fetchPokemon };
}
