import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { apiClient } from '../../lib/api-client';

type Seat = {
  id: string;
  label: string;
  row: string;
  number: number;
};

type Screening = {
  id: string;
  hall: { seatMap: { rows: Array<{ label: string; seats: Seat[] }> } };
};

type SeatSelectorProps = {
  screening: Screening;
};

export const SeatSelector = ({ screening }: SeatSelectorProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const mutation = useMutation({
    mutationFn: async () => {
      const seatIds = selectedSeats.map((seat) => seat.id);
      const response = await apiClient.post('/reservations', {
        screeningId: screening.id,
        seatIds,
        userId: 'me', // TODO replace with auth context
        totalAmount: seatIds.length * 1200,
      });
      return response.data;
    },
  });

  const toggleSeat = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((item) => item.id === seat.id);
      if (exists) {
        return prev.filter((item) => item.id !== seat.id);
      }
      return [...prev, seat];
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900 p-4">
        {screening.hall.seatMap.rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-8 text-xs uppercase tracking-wide text-slate-400">{row.label}</span>
            <div className="flex flex-wrap gap-2">
              {row.seats.map((seat) => {
                const isSelected = selectedSeats.some((item) => item.id === seat.id);
                return (
                  <button
                    key={seat.id}
                    type="button"
                    onClick={() => toggleSeat(seat)}
                    className={`h-10 w-10 rounded-sm border text-sm font-semibold transition ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {seat.number}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-md bg-slate-900/60 px-4 py-3">
        <p className="text-sm text-slate-300">
          Selected Seats:{' '}
          <span className="font-semibold text-white">
            {selectedSeats.map((seat) => seat.label).join(', ') || 'None'}
          </span>
        </p>
        <button
          type="button"
          disabled={!selectedSeats.length || mutation.isPending}
          onClick={() => mutation.mutate()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition enabled:hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? 'Reserving...' : 'Reserve Seats'}
        </button>
      </div>
    </div>
  );
};
