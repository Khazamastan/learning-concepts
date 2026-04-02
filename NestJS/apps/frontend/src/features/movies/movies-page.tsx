import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../lib/api-client';
import { MovieCard } from './movie-card';

export const MoviesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await apiClient.get('/movies');
      return response.data;
    },
  });

  if (isLoading) {
    return <p className="text-slate-400">Loading movies...</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
