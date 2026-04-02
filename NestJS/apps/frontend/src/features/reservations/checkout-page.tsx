import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../lib/api-client';
import { SeatSelector } from './seat-selector';

export const CheckoutPage = () => {
  const { reservationId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['screening', reservationId],
    enabled: Boolean(reservationId),
    queryFn: async () => {
      const response = await apiClient.get(`/screenings/${reservationId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <p className="text-slate-400">Loading seat map...</p>;
  }

  if (!data) {
    return <p className="text-slate-400">Screening not found.</p>;
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Choose Your Seats</h1>
        <p className="text-sm text-slate-400">{data.movie.title}</p>
      </header>
      <SeatSelector screening={data} />
    </section>
  );
};
