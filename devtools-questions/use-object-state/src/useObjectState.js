import * as React from "react";

export function useObjectState(initialState = {}) {
  const baseRef = React.useRef(initialState);
  const [state, setState] = React.useState(initialState);

  const setObjectState = React.useCallback((update) => {
    setState((current) => {
      const next =
        typeof update === "function"
          ? { ...current, ...update(current) }
          : { ...current, ...update };
      return next;
    });
  }, []);

  const reset = React.useCallback(() => {
    setState(baseRef.current);
  }, []);

  return [state, setObjectState, reset];
}
