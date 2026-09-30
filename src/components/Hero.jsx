import Rating from './Rating';
import useApi from '../hooks/useApi';
import { GENRE_NAMES } from '../constants/genres';
import { useLibrary } from '../context/LibraryContext';
import { useUI } from '../context/UIContext';

// Big banner for the top trending title
export default function Hero() {
  const { data, loading } = useApi('/trending/all/week');
  const { isSaved, toggleWatchlist } = useLibrary();
  const { openDetails } = useUI();
  const movie = data && data[0];

  if (loading || !movie) {
    return <div className="mx-4 mb-10 mt-6 h-[55vh] animate-pulse rounded-3xl bg-neutral-200 dark:bg-neutral-900 sm:mx-8" />;
  }

  const genreText = movie.genres.slice(0, 3).map((g) => GENRE_NAMES[g]).join(' / ');

  return (
    <div className="relative mx-4 mb-10 mt-6 flex min-h-[55vh] items-end overflow-hidden rounded-3xl sm:mx-8">
      {movie.back ? (
        <img src={movie.back} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, hsl(${movie.hue} 60% 30%), hsl(${(movie.hue + 80) % 360} 60% 8%))` }}
        />
      )}
      {/* dark fade so the white text stays readable in both themes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <div className="relative w-full max-w-3xl p-6 text-white sm:p-10">
        <span className="text-xs font-semibold text-emerald-300">Trending this week</span>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-6xl">{movie.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-200">
          <Rating value={movie.rating} />
          <span>{movie.year}</span>
          <span>{genreText}</span>
        </div>

        <p className="mt-4 line-clamp-3 max-w-xl text-neutral-200">{movie.overview}</p>

        <div className="mt-6 flex gap-3">
          <button onClick={() => openDetails(movie)} className="btn bg-emerald-400 text-neutral-950 hover:bg-emerald-300">
            Details
          </button>
          <button onClick={() => toggleWatchlist(movie)} className="btn border border-white/40 text-white hover:border-emerald-300 hover:text-emerald-300">
            {isSaved(movie) ? 'Remove from watchlist' : '+ Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
}
