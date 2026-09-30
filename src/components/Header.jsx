import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom';
import GenreMenu from './GenreMenu';
import ThemeToggle from './ThemeToggle';
import useDebounce from '../hooks/useDebounce';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import { useUI } from '../context/UIContext';

// NavLink hands us `isActive`, we use it to highlight the current page
const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
    isActive ? 'accent' : 'muted hover:text-neutral-900 dark:hover:text-white'
  }`;

export default function Header() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const onGenrePage = useMatch('/genre/*');
  const { user, logout } = useAuth();
  const { watchlist, downloads } = useLibrary();
  const { apiKey, openSettings } = useUI();

  // if the page is opened straight on /search?q=..., start with that text in the box
  const [term, setTerm] = useState(() => (pathname === '/search' ? new URLSearchParams(search).get('q') || '' : ''));
  const debouncedTerm = useDebounce(term, 400);

  // typing takes you to the search page, emptying the box takes you back home
  useEffect(() => {
    const text = debouncedTerm.trim();
    if (text) {
      navigate(`/search?q=${encodeURIComponent(text)}`, { replace: pathname === '/search' });
    } else if (pathname === '/search') {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]);

  // clear the box when you leave the search page
  useEffect(() => {
    if (pathname !== '/search') setTerm('');
  }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-neutral-950/75">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          Cine<span className="accent">view</span>
        </Link>

        <nav aria-label="Main" className="order-3 flex w-full flex-wrap items-center gap-1 sm:order-none sm:w-auto">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/movies" className={navClass}>Movies</NavLink>
          <NavLink to="/series" className={navClass}>Series</NavLink>
          <GenreMenu active={!!onGenrePage} />
          <NavLink to="/watchlist" className={navClass}>
            Watchlist{watchlist.length > 0 && ` (${watchlist.length})`}
          </NavLink>
          {user && (
            <NavLink to="/downloads" className={navClass}>
              Downloads{downloads.length > 0 && ` (${downloads.length})`}
            </NavLink>
          )}
        </nav>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search movies and series"
            aria-label="Search"
            className="input w-40 py-2 sm:w-56"
          />

          <button
            onClick={openSettings}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
              apiKey
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                : 'bg-amber-400/20 text-amber-700 dark:text-amber-300'
            }`}
          >
            {apiKey ? 'Live TMDB' : 'Sample data'}
          </button>

          <ThemeToggle />

          {user ? (
            <>
              <span className="hidden text-sm md:inline">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn-outline px-4 py-1.5">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline px-4 py-1.5">Log in</Link>
              <Link to="/signup" className="btn-primary px-4 py-1.5">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
