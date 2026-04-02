import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../lib/api-client';
import { ScreeningList } from '../reservations/screening-list';

export const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['movie', movieId],
    enabled: Boolean(movieId),
    queryFn: async () => {
      const response = await apiClient.get(`/movies/${movieId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <p className="text-slate-400">Loading movie details...</p>;
  }

  if (!data) {
    return <p className="text-slate-400">Movie not found.</p>;
  }

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-6 md:flex-row">
        {data.posterUrl && (
          <img
            src={data.posterUrl}
            alt={data.title}
            className="h-80 w-56 rounded-md object-cover shadow-lg"
          />
        )}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-sm uppercase tracking-wider text-primary">{data.genre}</p>
          <p className="text-slate-300">{data.synopsis}</p>
        </div>
      </header>
      <ScreeningList movieId={movieId!} />
    </section>
  );
};
