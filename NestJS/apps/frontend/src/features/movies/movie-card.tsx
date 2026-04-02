import { Link } from 'react-router-dom';

type MovieCardProps = {
  movie: {
    id: string;
    title: string;
    synopsis: string;
    posterUrl?: string;
    genre: string;
  };
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <article className="flex flex-col rounded-lg border border-slate-800 bg-slate-900 shadow-lg">
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-60 w-full rounded-t-lg object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-60 items-center justify-center rounded-t-lg bg-slate-800 text-slate-400">
          No Poster
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
          <p className="text-xs uppercase tracking-wide text-primary">{movie.genre}</p>
        </div>
        <p className="line-clamp-3 text-sm text-slate-400">{movie.synopsis}</p>
        <Link
          to={`/movies/${movie.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
        >
          View Screenings
        </Link>
      </div>
    </article>
  );
};
