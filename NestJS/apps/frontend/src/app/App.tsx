import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';

import { createAppRouter } from '../routes/router';
import { ThemeProvider } from '../providers/theme-provider';

type AppProps = {
  queryClient: QueryClient;
};

export const App = ({ queryClient }: AppProps) => {
  const router = useMemo(() => createAppRouter(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
