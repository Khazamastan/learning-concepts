import { useEffect, useState } from 'react';

export function useSSR() {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  return {
    isServer,
    isClient: !isServer,
  };
}
