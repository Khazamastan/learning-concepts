import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { apiClient } from '../../lib/api-client';

type ScreeningListProps = {
  movieId: string;
};

export const ScreeningList = ({ movieId }: ScreeningListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['screenings', movieId],
    queryFn: async () => {
      const response = await apiClient.get(`/screenings`, { params: { movieId } });
      return response.data;
    },
  });

  if (isLoading) {
    return <p className="text-slate-400">Loading screenings...</p>;
  }

  if (!data?.length) {
    return <p className="text-slate-400">No screenings scheduled yet.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((screening: any) => (
        <article
          key={screening.id}
          className="flex flex-col gap-3 rounded-md border border-slate-800 bg-slate-900/60 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-lg font-semibold text-white">{screening.hall.name}</p>
            <p className="text-sm text-slate-400">
              {format(new Date(screening.startTime), 'EEE, MMM d • h:mm a')}
            </p>
          </div>
          <Link
            to={`/checkout/${screening.id}`}
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
          >
            Select Seats
          </Link>
        </article>
      ))}
    </div>
  );
};
