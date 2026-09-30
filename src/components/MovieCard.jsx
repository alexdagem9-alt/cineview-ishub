import Poster from './Poster';
import Rating from './Rating';
import { useLibrary } from '../context/LibraryContext';
import { useUI } from '../context/UIContext';

// `wide` makes the card fill its grid cell instead of using the fixed row width
export default function MovieCard({ movie, wide = false }) {
  const { isSaved } = useLibrary();
  const { openDetails } = useUI();

  return (
    <button
      onClick={() => openDetails(movie)}
      className={`group text-left ${wide ? 'w-full' : 'w-40 shrink-0 sm:w-44'}`}
    >
      <div className="relative overflow-hidden rounded-xl ring-1 ring-black/10 transition duration-300 group-hover:-translate-y-1 group-hover:ring-emerald-500 dark:ring-white/10 dark:group-hover:ring-emerald-400">
        <Poster movie={movie} className="aspect-[2/3] w-full" />
        {isSaved(movie) && (
          <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-emerald-400 dark:text-neutral-950">
            Saved
          </span>
        )}
      </div>

      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{movie.title}</p>
          <p className="muted text-xs">{movie.year} &middot; {movie.type === 'tv' ? 'Series' : 'Movie'}</p>
        </div>
        <Rating value={movie.rating} />
      </div>
    </button>
  );
}
