import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-4 py-8 text-sm dark:border-white/10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-extrabold tracking-tight">
            Cine<span className="accent">view</span>
          </p>
          <p className="muted mt-1 max-w-xs text-xs">
            Browse movies and series, save a watchlist and watch trailers.
          </p>
        </div>

        <nav aria-label="Footer" className="muted flex gap-6 text-sm">
          <Link to="/movies" className="hover:text-emerald-600 dark:hover:text-emerald-400">Movies</Link>
          <Link to="/series" className="hover:text-emerald-600 dark:hover:text-emerald-400">Series</Link>
          <Link to="/watchlist" className="hover:text-emerald-600 dark:hover:text-emerald-400">Watchlist</Link>
        </nav>
      </div>

      <p className="muted mx-auto mt-6 max-w-7xl text-xs">
        &copy; {new Date().getFullYear()} Cineview.
      </p>
    </footer>
  );
}
