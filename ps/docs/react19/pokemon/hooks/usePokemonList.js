import { useCallback, useEffect, useState, useTransition } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export function usePokemonList(initialIds) {
  const [ids, setIds] = useState(initialIds);
  const [state, setState] = useState({ data: [], error: null });
  const [isPending, startTransition] = useTransition();

  const refetch = useCallback((nextIds = ids) => {
    startTransition(() => {
      Promise.all(nextIds.map((id) => fetch(BASE_URL + id).then((response) => response.json())))
        .then((results) => {
          setState({ data: results.sort((a, b) => a.id - b.id), error: null });
          setIds(nextIds);
        })
        .catch((error) => {
          setState({ data: [], error });
        });
    });
  }, [ids, startTransition]);

  useEffect(() => {
    refetch(initialIds);
  }, [initialIds, refetch]);

  return { ...state, ids, refetch, isPending };
}
