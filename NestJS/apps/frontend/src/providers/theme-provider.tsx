import { PropsWithChildren, useEffect, useState } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};
