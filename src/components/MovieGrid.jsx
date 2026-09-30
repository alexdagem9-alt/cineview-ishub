import MovieCard from './MovieCard';
import Skeletons from './Skeletons';

// Presentational grid. Pass it a list you already have (watchlist, downloads) or use ApiGrid.
export default function MovieGrid({ title, items, loading = false, error = null, emptyText }) {
  return (
    <section className="px-4 pb-16 pt-8 sm:px-8">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {loading && <Skeletons count={12} wide />}
        {!loading && items && items.map((movie) => <MovieCard wide key={movie.type + movie.id} movie={movie} />)}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && items && items.length === 0 && <p className="muted">{emptyText}</p>}
    </section>
  );
}
