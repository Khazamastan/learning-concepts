import { useCallback, useState } from 'react';

export function useCopyToClipboard(timeout = 1500) {
  const [copiedText, setCopiedText] = useState(null);
  const [error, setError] = useState(null);

  const copy = useCallback(async (value) => {
    if (!navigator?.clipboard) {
      setError(new Error('Clipboard API not supported'));
      return false;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedText(value);
      setError(null);
      if (timeout > 0) {
        setTimeout(() => setCopiedText(null), timeout);
      }
      return true;
    } catch (err) {
      setError(err);
      setCopiedText(null);
      return false;
    }
  }, [timeout]);

  return { copiedText, error, copy };
}
