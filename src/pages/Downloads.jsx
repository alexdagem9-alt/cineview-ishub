import MovieGrid from '../components/MovieGrid';
import { useLibrary } from '../context/LibraryContext';

export default function Downloads() {
  const { downloads } = useLibrary();

  return (
    <MovieGrid
      title="My downloads"
      items={downloads}
      emptyText="No downloads yet. Open a title and press Download."
    />
  );
}
