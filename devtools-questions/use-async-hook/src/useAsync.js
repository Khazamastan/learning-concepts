import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsync(asyncFn, dependencies = []) {
  const mountedRef = useRef(true);
  const [state, setState] = useState({ status: 'idle', value: null, error: null });

  const run = useCallback(async (...args) => {
    setState({ status: 'pending', value: null, error: null });
    try {
      const value = await asyncFn(...args);
      if (mountedRef.current) {
        setState({ status: 'resolved', value, error: null });
      }
      return value;
    } catch (error) {
      if (mountedRef.current) {
        setState({ status: 'rejected', value: null, error });
      }
      throw error;
    }
  }, dependencies);

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  return { ...state, run };
}
