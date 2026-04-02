import * as React from "react";

export function useThrottle(value, delay = 100) {
  const lastExecutedRef = React.useRef(0);
  const throttledValueRef = React.useRef(value);
  const [, forceRender] = React.useReducer((count) => count + 1, 0);

  React.useEffect(() => {
    const now = Date.now();
    const timeSinceLast = now - lastExecutedRef.current;

    if (timeSinceLast >= delay) {
      throttledValueRef.current = value;
      lastExecutedRef.current = now;
      forceRender();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      throttledValueRef.current = value;
      lastExecutedRef.current = Date.now();
      forceRender();
    }, delay - timeSinceLast);

    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return throttledValueRef.current;
}
