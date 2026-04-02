import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-primary">
          CineReserve
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-primary' : 'text-slate-300 hover:text-primary'
            }
            end
          >
            Movies
          </NavLink>
          <NavLink
            to="/signin"
            className="rounded-md border border-primary px-3 py-1.5 text-primary hover:bg-primary hover:text-primary-foreground transition"
          >
            Sign In
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
