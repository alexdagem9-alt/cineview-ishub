import MovieCard from './MovieCard';
import Skeletons from './Skeletons';
import useApi from '../hooks/useApi';

// A titled, horizontally scrolling row of cards
export default function MovieRow({ title, path, params = {} }) {
  const { data, loading, error } = useApi(path, params);

  return (
    <section className="mb-10">
      <h2 className="mb-4 px-4 text-xl font-bold sm:px-8">{title}</h2>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-3 sm:px-8">
        {loading && <Skeletons />}
        {error && <p className="text-red-500">{error}</p>}
        {data && data.map((movie) => <MovieCard key={movie.type + movie.id} movie={movie} />)}
      </div>
    </section>
  );
}
