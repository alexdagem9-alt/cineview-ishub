import MovieGrid from '../components/MovieGrid';
import { useLibrary } from '../context/LibraryContext';

export default function Watchlist() {
  const { watchlist } = useLibrary();

  return (
    <MovieGrid
      title="My watchlist"
      items={watchlist}
      emptyText="Nothing saved yet. Open a title and add it."
    />
  );
}
